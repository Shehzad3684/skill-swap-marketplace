import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Chip, List, ListItem, ListItemText, Box, Autocomplete, Paper, IconButton } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { findMatches } from '../utils/matching';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import MessageIcon from '@mui/icons-material/Message';

const techSkills = [
  'Web Developer', 'Prompt Engineer', 'Front End', 'Back End', 'React', 'Angular', 'Vue.js',
  'Node.js', 'Python', 'Java', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go', 'Rust',
  'Machine Learning', 'Artificial Intelligence', 'Data Science', 'DevOps', 'Cloud Computing',
  'Blockchain', 'Cybersecurity', 'UI/UX Design', 'Mobile App Development', 'Game Development',
  'AR/VR Development', 'IoT', 'Big Data', 'Full Stack', 'GraphQL', 'Docker', 'Kubernetes',
];

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setBio(data.bio || '');
          setSkills(data.skills || []);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && skills.length > 0) {
      findMatches(user.uid, skills).then(setMatches);
    }
  }, [user, skills]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await setDoc(doc(firestore, 'users', user.uid), {
          name,
          bio,
          skills
        }, { merge: true });
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    }
  };

  const handleAddSkill = (event, newValue) => {
    if (newValue && !skills.includes(newValue)) {
      setSkills([...skills, newValue]);
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  const handleMessageClick = (recipientId) => {
    navigate('/messages', { state: { recipientId } });
  };

  if (!user) {
    return <Typography variant="h6">Please sign in to view your profile.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <SEO title="Profile" description="Manage your profile and see your matches." />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Your Profile
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
            />
            <Autocomplete
              fullWidth
              options={techSkills}
              renderInput={(params) => <TextField {...params} label="Add a skill" variant="outlined" margin="normal" />}
              value={newSkill}
              onChange={handleAddSkill}
            />
            <Box sx={{ mt: 2, mb: 2 }}>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleDeleteSkill(skill)}
                  sx={{ m: 0.5 }}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
            <Button type="submit" variant="contained" fullWidth size="large">
              Update Profile
            </Button>
          </Box>
        </Paper>

        <Typography variant="h5" sx={{ mb: 2 }}>Your Matches</Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          {matches.length === 0 ? (
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary', textAlign: 'center' }}>
              No matches found yet. Add more skills to find peers!
            </Typography>
          ) : (
            <List>
              {matches.map((match, index) => (
                <ListItem
                  key={index}
                  divider={index !== matches.length - 1}
                  secondaryAction={
                    <IconButton edge="end" aria-label="message" onClick={() => handleMessageClick(match.userId)} color="primary">
                      <MessageIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={<Typography variant="h6">{match.userName || 'Anonymous User'}</Typography>}
                    secondary={`Matched skill: ${match.matchedSkill}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
}

export default Profile;
