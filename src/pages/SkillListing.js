import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Paper, Chip, Box, Grid, InputAdornment, IconButton, MenuItem } from '@mui/material';
import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestore } from '../firebase';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const CATEGORIES = ['All', 'Technology', 'Language', 'Arts', 'Music', 'Cooking', 'Business', 'Other'];

function SkillListing() {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newSkillCategory, setNewSkillCategory] = useState('Technology');

  useEffect(() => {
    const q = query(collection(firestore, 'skills'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const skillList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSkills(skillList);
      setFilteredSkills(skillList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let result = skills;

    if (selectedCategory !== 'All') {
      result = result.filter(skill => skill.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(skill =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSkills(result);
  }, [skills, searchQuery, selectedCategory]);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      try {
        await addDoc(collection(firestore, 'skills'), {
          name: newSkill.trim(),
          category: newSkillCategory,
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
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <SEO title="Browse Skills" description="Explore the wide range of skills available for swap." />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: '"Orbitron", sans-serif', mb: 2 }}>
          Skill Exchange Board
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Discover what others are teaching or request a skill you want to learn.
        </Typography>

        {/* Search and Filter Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
               <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                 {CATEGORIES.map((cat) => (
                   <Chip
                    key={cat}
                    label={cat}
                    onClick={() => setSelectedCategory(cat)}
                    color={selectedCategory === cat ? "primary" : "default"}
                    variant={selectedCategory === cat ? "filled" : "outlined"}
                    clickable
                   />
                 ))}
               </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Add Skill Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 6, bgcolor: 'background.paper', border: '1px dashed rgba(255,255,255,0.2)' }}>
          <Typography variant="h6" gutterBottom>Don't see what you're looking for?</Typography>
          <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <TextField
              label="Skill Name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, minWidth: '200px' }}
              required
            />
            <TextField
              select
              label="Category"
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              size="small"
              sx={{ minWidth: '150px' }}
            >
              {CATEGORIES.filter(c => c !== 'All').map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" color="secondary">
              Post Request
            </Button>
          </form>
        </Paper>

        {/* Skills Grid */}
        <Box>
           <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
             {selectedCategory === 'All' ? 'All Skills' : `${selectedCategory} Skills`} ({filteredSkills.length})
           </Typography>

           {filteredSkills.length === 0 ? (
             <Typography align="center" color="text.secondary" sx={{ py: 4 }}>No skills found matching your criteria.</Typography>
           ) : (
             <Grid container spacing={2}>
               {filteredSkills.map((skill) => (
                 <Grid item xs={12} sm={6} md={4} lg={3} key={skill.id}>
                   <motion.div whileHover={{ scale: 1.02 }}>
                     <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>{skill.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{skill.category || 'Uncategorized'}</Typography>
                        </Box>
                     </Paper>
                   </motion.div>
                 </Grid>
               ))}
             </Grid>
           )}
        </Box>
      </motion.div>
    </Container>
  );
}

export default SkillListing;
