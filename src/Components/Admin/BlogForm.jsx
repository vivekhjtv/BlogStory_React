import React, { useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { validationBlogForm } from '../../validation';
import JoditEditor from 'jodit-react';

const defaultTheme = createTheme();

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function BlogForm() {
  const [errors, setErrors] = useState({});
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
  });
  const [selectedImageName, setSelectedImageName] = useState('');
  const descriptionRef = useRef('');
  const handleChange = (event) => {
    // console.log(event);
    const { name, value } = event.target;
    setBlogData({ ...blogData, [name]: value });
  };
  const handleChangeDescription = (data) => {
    setBlogData({ ...blogData, description: data });
  };
  // console.log(blogData);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBlogData({
          ...blogData,
          image: file,
        });
        setSelectedImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validationBlogForm(blogData);
    // console.log(validation);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      console.log('Successfully Submitted - Add Blog Form');
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
            <AssignmentRoundedIcon sx={{ fontSize: '2.4rem' }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h3"
            sx={{ fontFamily: 'Shantell Sans' }}
          >
            Add Blog
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
                  value={blogData.title}
                />
                {errors.title && (
                  <Typography variant="body2" color="error">
                    {errors.title}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={12}>
                <JoditEditor
                  fullWidth
                  id="description"
                  label="Write something about blog"
                  name="description"
                  autoComplete="family-name"
                  ref={descriptionRef}
                  onChange={handleChangeDescription}
                  value={blogData.description}
                  multiline
                  rows={8}
                  style={{ minHeight: '400px' }}
                />
                {errors.description && (
                  <Typography variant="body2" color="error">
                    {errors.description}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="category"
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  autoFocus
                  onChange={handleChange}
                  value={blogData.category}
                />
                {errors.title && (
                  <Typography variant="body2" color="error">
                    {errors.category}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="contained"
                  onChange={handleImageChange}
                  startIcon={<CloudUploadIcon />}
                >
                  {selectedImageName ? selectedImageName : 'Upload Image'}

                  <VisuallyHiddenInput type="file" />
                </Button>
              </Grid>
            </Grid>
            {errors.image && (
              <Typography variant="body2" color="error">
                {errors.image}
              </Typography>
            )}
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

export default BlogForm;
