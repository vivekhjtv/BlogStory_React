import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link, Link as NavLink, Navigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  InputBase,
  IconButton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  styled,
} from '@mui/material';
import { deleteBlog, getBlogsData } from '../../api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [editableBlog, setEditableBlog] = useState(null);

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

  const handleEdit = () => {
    setEditableBlog(true);
  };

  const handleSave = () => {
    setEditableBlog(false);
    // You can add logic here to save the edited blog data (if needed).
  };
  const handleDelete = async (blogId) => {
    try {
      console.log(blogId);
      await deleteBlog(blogId); // Assuming you have a deleteBlog API function.
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  return (
    <>
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
                  placeholder="Search about blog or categories..."
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
        <Grid
          sx={{ marginRight: 6 }}
          container
          justifyContent="flex-end"
          spacing={2}
        >
          <Grid item>
            <Container sx={{ paddingTop: 2 }} maxWidth="lg">
              <Button
                component={Link}
                to="/admin/blog/add"
                variant="contained"
                endIcon={<PostAddIcon />}
              >
                Add Blog
              </Button>
            </Container>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Container sx={{ py: 8, paddingTop: 2 }} maxWidth="lg">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ fontSize: '18px' }}>
                      Blog Title
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: '18px' }} align="left">
                      Blog Description
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: '18px' }} align="left">
                      Category
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: '18px' }} align="center">
                      Edit
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: '18px' }} align="center">
                      Delete
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogs.map((blog) => (
                    <StyledTableRow key={blog.name}>
                      <StyledTableCell component="th" scope="row">
                        {editableBlog ? (
                          <TextField
                            value={blog.title}
                            onChange={(e) => {
                              const updatedBlogs = [...blogs];
                              const index = updatedBlogs.findIndex(
                                (b) => b.name === blog.name
                              );
                              updatedBlogs[index].title = e.target.value;
                              setBlogs(updatedBlogs);
                            }}
                          />
                        ) : (
                          blog.title
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {editableBlog ? (
                          <TextField
                            value={blog.content}
                            onChange={(e) => {
                              const updatedBlogs = [...blogs];
                              const index = updatedBlogs.findIndex(
                                (b) => b.name === blog.name
                              );
                              updatedBlogs[index].content = e.target.value;
                              setBlogs(updatedBlogs);
                            }}
                          />
                        ) : (
                          blog.content.substring(0, 80) + '...'
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {editableBlog ? (
                          <TextField
                            value={blog.category}
                            onChange={(e) => {
                              const updatedBlogs = [...blogs];
                              const index = updatedBlogs.findIndex(
                                (b) => b.name === blog.name
                              );
                              updatedBlogs[index].category = e.target.value;
                              setBlogs(updatedBlogs);
                            }}
                          />
                        ) : (
                          blog.category
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="text"
                          onClick={editableBlog ? handleSave : handleEdit}
                        >
                          {editableBlog ? 'Save' : 'Edit'}
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => handleDelete(blog.id)}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminBlogs;
