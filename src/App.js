import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SkillListing from './pages/SkillListing';
import Messages from './pages/Messages';
import AuthForm from './components/AuthForm';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Professional Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#29b6f6', // Professional Blue
    },
    secondary: {
      main: '#66bb6a', // Professional Green
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Orbitron", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Orbitron", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Orbitron", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Orbitron", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Orbitron", sans-serif', fontWeight: 500 },
    h6: { fontFamily: '"Orbitron", sans-serif', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HelmetProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={user ? <Navigate to="/profile" /> : <AuthForm />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" />} />
              <Route path="/skills" element={<SkillListing />} />
              <Route path="/messages" element={user ? <Messages /> : <Navigate to="/auth" />} />
            </Routes>
          </motion.div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
