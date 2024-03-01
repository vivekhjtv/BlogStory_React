import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getBlogDataById } from '../api';

function Blog() {
  // console.log('Render');
  const blogId = useParams();
  // console.log(blogId);
  const [dataFetched, setDataFetched] = useState(false);
  const [blogPost, setBlogPost] = useState({});

  const fetchBlogPost = async () => {
    try {
      const blogData = await getBlogDataById(blogId);
      if (blogData) {
        setBlogPost(blogData);
        setDataFetched(true);
      } else throw new Error('Failed to load data');
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };
  // console.log(blogPost);
  useEffect(() => {
    if (!dataFetched) {
      fetchBlogPost();
    }
  }, [dataFetched]);

  return (
    <>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Card
            sx={{
              maxWidth: '100%',
              borderRadius: '16px',
              marginBottom: '50px',
            }}
          >
            <CardMedia
              sx={{ height: 400 }}
              image={blogPost.image || 'CardImage'}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {blogPost.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {blogPost.category}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {blogPost.content}...
              </Typography>
            </CardContent>
            <Typography
              sx={{ paddingLeft: '16px' }}
              variant="caption"
              gutterBottom
            >
              By Vivek Jethva on 10-02-2024 13:47 PM IST
            </Typography>

            <CardActions>
              <Button size="small">Share</Button>
            </CardActions>
          </Card>
        </Container>
      </Grid>
    </>
  );
}

export default Blog;
