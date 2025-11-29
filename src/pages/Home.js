import React from 'react';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <SEO />
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Skill Swap <br />
              <Box component="span" sx={{ color: 'primary.main' }}>Marketplace</Box>
            </Typography>
            <Typography variant="h5" paragraph color="text.secondary" sx={{ mb: 4 }}>
              Connect with professionals, exchange knowledge, and master new skills through peer-to-peer learning.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" size="large" component={Link} to="/auth">
                Get Started
              </Button>
              <Button variant="outlined" color="primary" size="large" component={Link} to="/skills">
                Browse Skills
              </Button>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
           {/* Placeholder for a hero image or illustration */}
           <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
           >
             <Paper
              elevation={0}
              sx={{
                height: 400,
                bgcolor: 'transparent',
                backgroundImage: 'radial-gradient(circle, rgba(41,182,246,0.2) 0%, rgba(18,18,18,0) 70%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed #333',
                borderRadius: 4
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Connect & Learn
              </Typography>
            </Paper>
           </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
