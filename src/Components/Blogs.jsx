import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { getBlogsData } from '../api';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getBlogsData();
      setBlogs(data);
      setDataFetched(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      fetchData();
    }
  }, [dataFetched]);

  return (
    <div>
      <Grid container spacing={2}>
        <Container
          sx={{
            '@media (max-width: 1600px)': {
              paddingLeft: '0px',
              paddingRight: '0px',
              marginLeft: '100px',
              marginRight: '100px',
            },
            '@media (max-width: 1024px)': {
              paddingLeft: '0px',
              paddingRight: '0px',
              marginLeft: '60px',
              marginRight: '60px',
            },
            '@media (max-width: 440px)': {
              paddingLeft: '0px',
              paddingRight: '0px',
              marginLeft: '30px',
              marginRight: '30px',
            },
          }}
          maxWidth="lg"
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {/* Categories heading on the left */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{ marginBottom: '30px', fontFamily: 'Protest Riot' }}
              >
                Blogs
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 400,
                  float: 'right',
                  boxShadow:
                    '0px 0px 8px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 4px 1px 31px 4px rgba(0,0,0,0.12)',
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search about blog or catagories..."
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Grid item xs={12}>
          <Container sx={{ py: 8, paddingTop: 2 }} maxWidth="lg">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {blogs.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '20px',
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image={card.image}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>

                      <Typography>{card.content}</Typography>
                    </CardContent>
                    <CardActions>
                      {/* {console.log(`/blog/${card.id}`)} */}
                      <Button
                        to={`/user/blog/${card.id}`}
                        component={RouterLink}
                        size="small"
                      >
                        View
                      </Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </div>
  );
}

export default Blogs;
