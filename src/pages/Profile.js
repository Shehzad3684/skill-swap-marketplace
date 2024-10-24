import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Chip, List, ListItem, ListItemText, Box, Autocomplete } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { findMatches } from '../utils/matching';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const NeonText = styled(Typography)(({ theme }) => ({
  color: '#00ff00',
  textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00',
  fontFamily: '"Orbitron", sans-serif',
}));

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
        console.log('Updating profile for user:', user.uid);
        await setDoc(doc(firestore, 'users', user.uid), {
          name,
          bio,
          skills
        }, { merge: true });
        console.log('Profile updated successfully!');
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

  if (!user) {
    return <NeonText variant="h6">Please sign in to view your profile.</NeonText>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NeonText variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
          Your Profile
        </NeonText>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{ style: { fontFamily: '"Orbitron", sans-serif' } }}
            InputLabelProps={{ style: { fontFamily: '"Orbitron", sans-serif' } }}
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
            sx={{ mb: 2 }}
            InputProps={{ style: { fontFamily: '"Orbitron", sans-serif' } }}
            InputLabelProps={{ style: { fontFamily: '"Orbitron", sans-serif' } }}
          />
          <Autocomplete
            fullWidth
            options={techSkills}
            renderInput={(params) => <TextField {...params} label="Add a skill" variant="outlined" />}
            value={newSkill}
            onChange={handleAddSkill}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => handleDeleteSkill(skill)}
                sx={{ m: 0.5, backgroundColor: '#00ff00', color: '#000', fontFamily: '"Orbitron", sans-serif' }}
              />
            ))}
          </Box>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, fontFamily: '"Orbitron", sans-serif' }}>
            Update Profile
          </Button>
        </Box>
        <NeonText variant="h5" sx={{ mt: 4, mb: 2 }}>Your Matches</NeonText>
        <List>
          {matches.map((match, index) => (
            <ListItem key={index} sx={{ backgroundColor: 'rgba(0, 255, 0, 0.1)', mb: 1, borderRadius: 2 }}>
              <ListItemText 
                primary={<Typography style={{ fontFamily: '"Orbitron", sans-serif' }}>{match.userName}</Typography>}
                secondary={<Typography style={{ fontFamily: '"Orbitron", sans-serif' }}>{`Matched skill: ${match.matchedSkill}`}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </motion.div>
    </Container>
  );
}

export default Profile;
