import React from 'react';
import { Container, Typography, Grid, Box, Paper, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

function About() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <SEO title="About Us" description="Learn more about Skill Swap Marketplace and our mission." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ fontFamily: '"Orbitron", sans-serif', mb: 6 }}>
          About Us
        </Typography>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>Our Mission</Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              At Skill Swap Marketplace, we believe that everyone has something valuable to teach and something new to learn. Our mission is to democratize education by connecting individuals directly, allowing them to exchange skills without the barriers of traditional institutions or high costs.
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Whether you're a coding wizard, a language enthusiast, or a culinary artist, there's someone out there who wants to learn from you – and who has the skills you need in return.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">Why We Started</Typography>
              <Typography variant="body2" color="text.secondary">
                Started in 2023, we saw a gap in the market for genuine, peer-to-peer learning. Online courses are great, but they lack the personal touch and feedback loop of 1-on-1 mentorship. We wanted to build a platform where community comes first.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>Meet the Team</Typography>
          <Grid container spacing={4} justifyContent="center">
             {/* Dummy Team Members */}
             {[1, 2, 3].map((item) => (
               <Grid item xs={12} sm={4} key={item}>
                 <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                   <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                     {item === 1 ? 'A' : item === 2 ? 'B' : 'C'}
                   </Avatar>
                   <Typography variant="h6">Team Member {item}</Typography>
                   <Typography variant="body2" color="text.secondary">Co-Founder</Typography>
                 </Paper>
               </Grid>
             ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
}

export default About;
