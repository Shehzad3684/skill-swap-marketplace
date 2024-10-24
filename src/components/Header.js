import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Header({ user }) {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Skill Swap Marketplace
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/skills">Skills</Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" component={Link} to="/messages">Messages</Button>
            <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/auth">Sign In / Sign Up</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
