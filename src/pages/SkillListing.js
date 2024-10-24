import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';

function SkillListing() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'skills'), (snapshot) => {
      const skillList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSkills(skillList);
    });

    return () => unsubscribe();
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      await addDoc(collection(firestore, 'skills'), {
        name: newSkill.trim(),
        createdAt: new Date(),
      });
      setNewSkill('');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Skill Listings
      </Typography>
      <form onSubmit={handleAddSkill} style={{ marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label="Add a new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Skill
        </Button>
      </form>
      <List>
        {skills.map((skill) => (
          <ListItem key={skill.id}>
            <ListItemText primary={skill.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default SkillListing; 
