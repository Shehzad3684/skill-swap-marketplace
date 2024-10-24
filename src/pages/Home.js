import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Skill Swap Marketplace
      </Typography>
      <Typography variant="body1" paragraph>
        Exchange skills and knowledge with others in your community.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/skills">
        Browse Skills
      </Button>
    </Container>
  );
}

export default Home; 
