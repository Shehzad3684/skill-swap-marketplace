import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, TextField, Paper, Divider, Chip, Box } from '@mui/material';
import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestore } from '../firebase';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

function SkillListing() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const q = query(collection(firestore, 'skills'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const skillList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSkills(skillList);
    });

    return () => unsubscribe();
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      try {
        await addDoc(collection(firestore, 'skills'), {
          name: newSkill.trim(),
          createdAt: new Date(),
        });
        setNewSkill('');
      } catch (error) {
        console.error("Error adding skill: ", error);
        alert("Could not add skill.");
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <SEO title="Skills" description="Browse available skills in the marketplace." />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Skill Board
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          Request new skills or see what's trending.
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '10px' }}>
            <TextField
              fullWidth
              label="Propose a new skill topic"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              variant="outlined"
              size="small"
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Paper>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills.map((skill) => (
          <Chip
            key={skill.id}
            label={skill.name}
            sx={{ fontSize: '1rem', p: 1 }}
            color="secondary"
            variant="outlined"
          />
        ))}
        </Box>
      </motion.div>
    </Container>
  );
}

export default SkillListing;
