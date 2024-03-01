import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { validateSignInUser } from '../../validation';
import { loginUser } from '../../api';
import { toast } from 'react-toastify';
import { doLogin } from '../../Auth/Logic';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BlogStory
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validateSignInUser(userData);
    // console.log(validation);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      try {
        const checkLogin = await loginUser({ userData });
        // console.log(checkLogin);
        if (checkLogin.error) {
          setErrors(checkLogin.error);
          console.log(checkLogin.error);
        } else {
          // Successful login, access user data with checkLogin.data
          doLogin(checkLogin.data);
          setUserData({ email: '', password: '' });
          toast.success('Successfully SignIn!', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          navigate('user/blogs');
        }
      } catch (error) {
        // Handle other errors (e.g., network issues)
        setErrors('Error during login');
        console.error('Error during login:', error.message);
      }
    }
  };
  console.log(errors);

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={userData.email}
                  autoFocus
                />

                {errors.email && (
                  <Typography variant="body2" color="error">
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={userData.password}
                />
                {errors.password && (
                  <Typography variant="body2" color="error">
                    {errors.password}
                  </Typography>
                )}
                {errors.user && (
                  <Typography variant="body2" color="error">
                    {errors.user}
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
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/SignUp" component={RouterLink} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
