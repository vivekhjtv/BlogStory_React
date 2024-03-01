import React, { useEffect, useState } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { Outlet } from 'react-router-dom';
import { Link as NavLink, Navigate } from 'react-router-dom';
import Header from '../Router/Header';
import { getCurrentUserDetail, isLoggedIn } from '../../Auth/Logic';

const drawerWidth = 240;
const paths = {
  'user/blogs': 'Blogs',
};

export const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,

  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function UserLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    // setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, []);
  console.log(user);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} user={user} />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'white',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          style={{
            backgroundColor: 'rgba(1, 1, 1, 1)',
            color: theme.palette.common.white,
            borderRight: '0',
          }}
        >
          <Typography
            variant="h4"
            color="inherit"
            style={{ marginLeft: '40px', fontFamily: 'Protest Revolution' }}
          >
            <b>BlogStory</b>
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon style={{ color: 'white' }} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Object.entries(paths).map(([route, text], index) => (
            <ListItem key={route} disablePadding>
              {/* {console.log(`/${route}`)} */}
              <ListItemButton component={NavLink} to={`/${route}`}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main
        style={{
          backgroundColor: '#faf7f2',
          height: '100vh',
          overflow: 'auto',
        }}
        open={open}
      >
        <DrawerHeader />

        <Box
          sx={{
            flexGrow: 1,
            marginLeft: '50px',
            marginTop: '35px',
            marginRight: '50px',
            '@media (max-width: 600px)': {
              marginLeft: '16px',
              marginRight: '16px',
            },
          }}
        >
          {isLoggedIn() ? <Outlet /> : <Navigate to={'/'} />}
        </Box>
      </Main>
    </Box>
  );
}

export default UserLayout;
