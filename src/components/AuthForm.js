import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { Button, TextField, Typography, Container, Box, Tabs, Tab } from '@mui/material';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log('Attempting to sign up/in');
    console.log('Email:', email);
    console.log('Is Sign Up:', isSignUp);
    try {
      if (isSignUp) {
        console.log('Creating new user');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created:', userCredential.user);
        await setDoc(doc(firestore, 'users', userCredential.user.uid), {
          name: name,
          email: email,
        });
      } else {
        console.log('Signing in user');
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={isSignUp ? 1 : 0} onChange={(_, newValue) => setIsSignUp(newValue === 1)}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>
      <Typography variant="h5" align="center" gutterBottom>
        {isSignUp ? 'Create Account' : 'Sign In'}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
      </form>
    </Container>
  );
}

export default AuthForm;
