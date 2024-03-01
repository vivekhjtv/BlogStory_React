import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { validationUserForm } from '../../validation';
const defaultTheme = createTheme();

function AddUsers() {
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    firstName: '',
    email: '',
    password: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validationUserForm(userData);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      console.log('Successfully Submitted - Add Blog Form');
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" style={{ height: '100vh' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'secondary.main',
              height: '70px',
              width: '70px',
            }}
          >
            <PersonAddIcon sx={{ fontSize: '2.4rem' }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h3"
            sx={{ fontFamily: 'Shantell Sans' }}
          >
            Add User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  value={userData.firstName}
                />
                {errors.firstName && (
                  <Typography variant="body2" color="error">
                    {errors.firstName}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={userData.email}
                />
                {errors.email && (
                  <Typography variant="body2" color="error">
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={userData.password}
                />
                {errors.password && (
                  <Typography variant="body2" color="error">
                    {errors.password}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Blog
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddUsers;
