import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: '#d3d3d3', borderRadius: '30px', py: 6 }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          BlogStory
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          It is blog post Portal.
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;
