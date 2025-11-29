import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import SEO from '../components/SEO';

function Terms() {
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <SEO title="Terms of Service" description="Read our Terms of Service and Privacy Policy." />
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: '"Orbitron", sans-serif' }}>
          Terms of Service & Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Last Updated: November 29, 2024
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>1. Introduction</Typography>
          <Typography variant="body1" paragraph>
            Welcome to Skill Swap Marketplace. By accessing our website, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </Typography>

          <Typography variant="h5" gutterBottom>2. Use License</Typography>
          <Typography variant="body1" paragraph>
            Permission is granted to temporarily download one copy of the materials (information or software) on Skill Swap Marketplace's website for personal, non-commercial transitory viewing only.
          </Typography>

          <Typography variant="h5" gutterBottom>3. User Conduct</Typography>
          <Typography variant="body1" paragraph>
            Users are expected to behave professionally and respectfully. Harassment, hate speech, or inappropriate behavior during skill swaps will result in immediate account termination.
          </Typography>

          <Typography variant="h5" gutterBottom>4. Disclaimer</Typography>
          <Typography variant="body1" paragraph>
            The materials on Skill Swap Marketplace's website are provided on an 'as is' basis. Skill Swap Marketplace makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </Typography>

          <Typography variant="h5" gutterBottom>5. Privacy Policy</Typography>
          <Typography variant="body1" paragraph>
            Your privacy is important to us. It is Skill Swap Marketplace's policy to respect your privacy regarding any information we may collect while operating our website. We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Terms;
