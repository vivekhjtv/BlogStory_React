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
import CategoryIcon from '@mui/icons-material/Category';
import { validationCatagoryForm } from '../../validation';
const defaultTheme = createTheme();

function AddCatagories() {
  const [catagoryData, setCatagoryData] = useState({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCatagoryData({ ...catagoryData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validationCatagoryForm(catagoryData);
    console.log(validation);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      console.log('Successfully Submitted - catagory form');
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm" style={{ height: '100vh' }}>
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
            <CategoryIcon sx={{ fontSize: '2.4rem' }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h3"
            sx={{ fontFamily: 'Shantell Sans' }}
          >
            Add Category
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
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  onChange={handleChange}
                  value={catagoryData.title}
                />
                {errors.title && (
                  <Typography variant="body2" color="error">
                    {errors.title}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Write something about blog"
                  name="description"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={catagoryData.description}
                  multiline
                  rows={4}
                />
                {errors.description && (
                  <Typography variant="body2" color="error">
                    {errors.description}
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

export default AddCatagories;
