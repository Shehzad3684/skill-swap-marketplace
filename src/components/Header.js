import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, useMediaQuery, Drawer, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ user }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignOut = () => {
    signOut(auth);
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/skills" onClick={handleDrawerToggle}>
            <ListItemText primary="Skills" />
          </ListItemButton>
        </ListItem>
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile" onClick={handleDrawerToggle}>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/messages" onClick={handleDrawerToggle}>
                <ListItemText primary="Messages" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/auth" onClick={handleDrawerToggle}>
              <ListItemText primary="Sign In" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ flexGrow: 1, textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 700, fontFamily: '"Orbitron", sans-serif' }}
          >
            SkillSwap
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color={isActive('/') ? "primary" : "inherit"}
                component={Link}
                to="/"
              >
                Home
              </Button>
              <Button
                color={isActive('/skills') ? "primary" : "inherit"}
                component={Link}
                to="/skills"
              >
                Skills
              </Button>
              {user ? (
                <>
                  <Button
                    color={isActive('/profile') ? "primary" : "inherit"}
                    component={Link}
                    to="/profile"
                  >
                    Profile
                  </Button>
                  <Button
                    color={isActive('/messages') ? "primary" : "inherit"}
                    component={Link}
                    to="/messages"
                  >
                    Messages
                  </Button>
                  <Button color="inherit" variant="outlined" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/auth"
                >
                  Sign In
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Header;
