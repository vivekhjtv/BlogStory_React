import React from 'react';
import {
  AppBar,
  Avatar,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { doLogout } from '../../Auth/Logic';
function Header({ open, handleDrawerOpen, user }) {
  return (
    <AppBar
      position="fixed"
      open={open}
      style={{
        backgroundColor: 'rgba(1, 1, 1, 1)',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Grid item>
          <Typography
            variant="h4"
            color="inherit"
            style={{ marginLeft: '40px', fontFamily: 'Protest Revolution' }}
          >
            <b>BlogStory</b>
          </Typography>
        </Grid>

        <div
          style={{
            marginLeft: 'auto',
          }}
        >
          <Grid item>
            <IconButton
              component={RouterLink}
              style={{ marginRight: '0px' }}
              to="/user/profile" // use /profile
            >
              <Chip
                avatar={
                  <Avatar
                    alt="Natacha"
                    src="https://source.unsplash.com/random"
                  />
                }
                sx={{ color: 'white' }}
                label={user ? user.name + ' ' + user.lastName : 'Profile'}
                variant="outlined"
              />
            </IconButton>
            <IconButton
              component={RouterLink}
              style={{ marginRight: '20px' }}
              to="/" // use /profile
              onClick={() => doLogout()}
            >
              <Chip label="Logout" variant="outlined" sx={{ color: 'white' }} />
            </IconButton>
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
