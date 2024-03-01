import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/system';
import { getUserProfileData } from '../../api';

const StyledContainer = styled(Container)({
  marginTop: (theme) => theme.spacing(4),
  height: '100vh',
});

const StyledHeader = styled(Grid)({
  textAlign: 'center',
  marginBottom: (theme) => theme.spacing(3),
});

const StyledAvatar = styled(Avatar)({
  width: 200,
  height: 200,
  margin: 'auto',
  border: '5px solid #000',
});

const StyledContent = styled(Paper)({
  padding: '30px',
});

const StyledList = styled(List)({
  marginTop: (theme) => theme.spacing(2),
});

const StyledListItem = styled(ListItem)({
  display: 'block',
});
const StyledFileInput = styled('input')({
  display: 'none', // hide the original file input
});

const StyledInputLabel = styled('label')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '10px',
  transition: 'border-color 0.3s ease-in-out',
  '&:hover': {
    borderColor: '#2196f3',
  },
});
const StyledCard = styled(Card)({
  marginBottom: '20px',
  backgroundColor: '#f0f0f0',
});

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '8px',
});

function Profile() {
  const [editable, setEditable] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getUserProfileData();
      setUsers(data[0]);
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

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUsers({ ...users, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <StyledContainer>
      <Grid container spacing={3} style={{ flexGrow: 1 }}>
        {/* Header Section */}
        <StyledHeader item xs={12}>
          <StyledInputLabel>
            <StyledFileInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <StyledAvatar alt="User Avatar" src={users.image} />
            <Typography
              sx={{ paddingTop: '12px' }}
              variant="caption"
              color="textSecondary"
            >
              Change Profile Picture
            </Typography>
          </StyledInputLabel>
          <Button onClick={editable ? handleSave : handleEdit} color="primary">
            {editable ? 'Save' : 'Edit'}
          </Button>
        </StyledHeader>
        <StyledHeader item xs={12}>
          {editable ? (
            <>
              <TextField
                label="Name"
                value={users.name}
                onChange={(e) => setUsers({ ...users, name: e.target.value })}
                fullWidth
                sx={{ marginBottom: '20px', width: '50%' }}
              />
              <TextField
                label="Role"
                value={users.role}
                sx={{ width: '50%' }}
                onChange={(e) => setUsers({ ...users, role: e.target.value })}
                fullWidth
              />
            </>
          ) : (
            <>
              <Typography variant="h4">{users.name}</Typography>
              <Typography variant="subtitle">{users.role}</Typography>
            </>
          )}
        </StyledHeader>

        {/* Content Section */}
        <Grid item xs={12}>
          <StyledContent>
            {editable ? (
              <TextField
                label="About Me"
                value={users.about}
                onChange={(e) => setUsers(e.target.value)}
                multiline
                fullWidth
              />
            ) : (
              <>
                <Typography variant="h5">About Me</Typography>
                <Typography>{users.about}</Typography>
              </>
            )}
          </StyledContent>
        </Grid>

        {/* Blogs Section */}
        <Grid item xs={12}>
          <StyledContent sx={{ marginBottom: '40px' }}>
            <Typography variant="h5">My Blogs</Typography>
            {editable ? (
              <StyledList>
                {users.blogs.map((blog) => (
                  <StyledCard key={blog.id}>
                    <StyledCardContent>
                      <TextField
                        label="Blog Title"
                        value={blog.title}
                        onChange={(e) => {
                          const updatedBlogs = [...users.blogs];
                          const index = updatedBlogs.findIndex(
                            (b) => b.id === blog.id
                          );
                          updatedBlogs[index].title = e.target.value;
                          setUsers(updatedBlogs);
                        }}
                        fullWidth
                        sx={{ marginBottom: '20px' }}
                      />
                      <TextField
                        label="Blog Content"
                        value={blog.content}
                        onChange={(e) => {
                          const updatedBlogs = [...users.blogs];
                          const index = updatedBlogs.findIndex(
                            (b) => b.id === blog.id
                          );
                          updatedBlogs[index].content = e.target.value;
                          setUsers(updatedBlogs);
                        }}
                        multiline
                        fullWidth
                      />
                    </StyledCardContent>
                  </StyledCard>
                ))}
              </StyledList>
            ) : (
              <StyledList>
                {users.blogs &&
                  users.blogs.map((blog) => (
                    <StyledCard key={blog.id}>
                      <StyledCardContent>
                        <Typography variant="subtitle1">
                          {blog.title}
                        </Typography>
                        <Typography>{blog.content}</Typography>
                      </StyledCardContent>
                    </StyledCard>
                  ))}
              </StyledList>
            )}
          </StyledContent>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default Profile;
