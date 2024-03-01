import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material';
import { getCatagoriesData } from '../api';

function Catagories() {
  const [catagories, setCatagories] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getCatagoriesData();
      setCatagories(data);
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
        <Typography
          variant="h3"
          sx={{ marginBottom: '30px', fontFamily: 'Protest Riot' }}
        >
          Catagories
        </Typography>
      </Grid>
      <Grid container spacing={4}>
        {catagories.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={6}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 8,
                width: { xs: '100%', sm: 'auto' },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 2,
              }}
            >
              <CardMedia
                component="img"
                width="100"
                height="100"
                alt="Contemplative Reptile album cover"
                src={card.image}
                sx={{
                  width: { xs: '100%', sm: 100 },
                  borderRadius: 5,
                }}
              />
              <Stack direction="column" spacing={2} alignItems="center">
                <Stack direction="column" spacing={0.2}>
                  <Typography
                    color="text.primary"
                    fontWeight="medium"
                    fontSize={15}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    component="div"
                    variant="caption"
                    color="text.secondary"
                    fontWeight="regular"
                  >
                    {card.content}
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Catagories;
