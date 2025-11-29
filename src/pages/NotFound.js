import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

function NotFound() {
  return (
    <Container maxWidth="md" sx={{ mt: 15, mb: 10, textAlign: 'center' }}>
      <SEO title="404 Not Found" />
      <Typography variant="h1" color="primary" sx={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 900, fontSize: '6rem' }}>
        404
      </Typography>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 6 }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Box>
        <Button variant="contained" color="primary" component={Link} to="/" size="large">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;
