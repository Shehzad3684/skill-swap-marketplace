import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontFamily: '"Orbitron", sans-serif' }}>
              SkillSwap
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connect with professionals, exchange knowledge, and master new skills through peer-to-peer learning.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column">
              <MuiLink component={Link} to="/" color="text.secondary" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Home
              </MuiLink>
              <MuiLink component={Link} to="/skills" color="text.secondary" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Browse Skills
              </MuiLink>
              <MuiLink component={Link} to="/about" color="text.secondary" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                About Us
              </MuiLink>
              <MuiLink component={Link} to="/contact" color="text.secondary" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Contact
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Box display="flex" flexDirection="column">
              <MuiLink component={Link} to="/faq" color="text.secondary" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                FAQ
              </MuiLink>
              <MuiLink component={Link} to="/terms" color="text.secondary" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Terms of Service
              </MuiLink>
              <MuiLink component={Link} to="/privacy" color="text.secondary" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Privacy Policy
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Box mt={5} pt={3} borderTop="1px solid rgba(255, 255, 255, 0.12)" textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Skill Swap Marketplace. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
