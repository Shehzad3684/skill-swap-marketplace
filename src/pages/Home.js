import React from 'react';
import { Container, Typography, Button, Box, Paper, Grid, Card, CardContent, CardMedia, useTheme, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import LanguageIcon from '@mui/icons-material/Language';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import StarIcon from '@mui/icons-material/Star';

function Home() {
  const theme = useTheme();

  const features = [
    { icon: <GroupIcon fontSize="large" color="primary" />, title: 'Peer-to-Peer', desc: 'Directly connect with real people. No middlemen, no hidden fees.' },
    { icon: <CodeIcon fontSize="large" color="primary" />, title: 'Diverse Skills', desc: 'From coding to cooking, find an expert in almost any field.' },
    { icon: <SecurityIcon fontSize="large" color="primary" />, title: 'Verified Community', desc: 'Join a trusted community of learners and professionals.' },
  ];

  const steps = [
    { number: '01', title: 'Create Profile', desc: 'Sign up and list the skills you can teach and the ones you want to learn.' },
    { number: '02', title: 'Find Matches', desc: 'Our algorithm connects you with people who have complementary skill sets.' },
    { number: '03', title: 'Start Swapping', desc: 'Message your match, schedule a session, and start learning immediately.' },
  ];

  const testimonials = [
    { name: "Sarah J.", role: "Web Developer", quote: "I traded React lessons for Spanish conversation practice. It was the best way to learn!" },
    { name: "Mike T.", role: "Graphic Designer", quote: "Found a mentor for Python within days. The community here is incredibly supportive." },
    { name: "Elena R.", role: "Digital Marketer", quote: "Skill Swap helped me pivot my career by connecting me with industry experts." },
  ];

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <SEO />

      {/* Hero Section */}
      <Box sx={{
        bgcolor: 'background.default',
        pt: 15,
        pb: 10,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(41, 182, 246, 0.15) 0%, rgba(18, 18, 18, 0) 50%)',
          pointerEvents: 'none',
        }
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
                  Master New Skills <br />
                  <Box component="span" sx={{ color: 'primary.main' }}>Together</Box>
                </Typography>
                <Typography variant="h5" paragraph color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                  The world's first true merit-based skill exchange. Trade your expertise for knowledge, mentorship, and growth.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="contained" color="primary" size="large" component={Link} to="/auth" sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                    Join Now
                  </Button>
                  <Button variant="outlined" color="primary" size="large" component={Link} to="/skills" sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                    Explore Skills
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    height: 450,
                    borderRadius: 4,
                    backgroundImage: 'linear-gradient(135deg, rgba(41, 182, 246, 0.1) 0%, rgba(102, 187, 106, 0.1) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Decorative Elements simulating activity */}
                  <Box sx={{ position: 'absolute', top: '20%', left: '10%' }}>
                    <Card sx={{ width: 180, p: 1, bgcolor: 'background.paper' }}>
                       <Box display="flex" alignItems="center" gap={1}>
                         <Avatar sx={{ width: 30, height: 30, bgcolor: 'secondary.main' }}>JS</Avatar>
                         <Typography variant="caption">Teaching JS</Typography>
                       </Box>
                    </Card>
                  </Box>
                   <Box sx={{ position: 'absolute', bottom: '25%', right: '10%' }}>
                    <Card sx={{ width: 180, p: 1, bgcolor: 'background.paper' }}>
                       <Box display="flex" alignItems="center" gap={1}>
                         <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.main' }}>UI</Avatar>
                         <Typography variant="caption">Learning Design</Typography>
                       </Box>
                    </Card>
                  </Box>
                  <Typography variant="h3" sx={{ color: 'rgba(255,255,255,0.05)', fontWeight: 900 }}>CONNECT</Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: '"Orbitron", sans-serif', mb: 8 }}>
            Why Choose Skill Swap?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={0} sx={{ p: 4, height: '100%', textAlign: 'center', bgcolor: 'transparent', border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', borderColor: 'primary.main' } }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" gutterBottom>{feature.title}</Typography>
                  <Typography variant="body1" color="text.secondary">{feature.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How it Works Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: '"Orbitron", sans-serif', mb: 8 }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ position: 'relative', p: 4 }}>
                  <Typography variant="h1" sx={{ position: 'absolute', top: 0, left: 0, opacity: 0.1, fontSize: '8rem', fontWeight: 900, lineHeight: 1 }}>
                    {step.number}
                  </Typography>
                  <Box sx={{ position: 'relative', zIndex: 1, mt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>{step.title}</Typography>
                    <Typography variant="body1" color="text.secondary">{step.desc}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: '"Orbitron", sans-serif', mb: 8 }}>
            Community Stories
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((t, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box display="flex" justifyContent="center" mb={2}>
                      <StarIcon color="warning" />
                      <StarIcon color="warning" />
                      <StarIcon color="warning" />
                      <StarIcon color="warning" />
                      <StarIcon color="warning" />
                    </Box>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                      "{t.quote}"
                    </Typography>
                    <Typography variant="h6">{t.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{t.role}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 12, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontFamily: '"Orbitron", sans-serif' }}>
            Ready to Start Learning?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Join thousands of others who are sharing their passion and learning new skills today.
          </Typography>
          <Button variant="contained" color="secondary" size="large" component={Link} to="/auth" sx={{ px: 6, py: 2, fontSize: '1.2rem' }}>
            Get Started for Free
          </Button>
        </Container>
      </Box>

    </Box>
  );
}

export default Home;
