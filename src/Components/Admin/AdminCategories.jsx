import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link } from 'react-router-dom';
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
import { deleteCategory, getCatagoriesData } from '../../api';

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

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [editableCategoryId, setEditableCategoryId] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getCatagoriesData();
      setCategories(data);
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

  const handleEdit = (categoryId) => {
    setEditableCategoryId(categoryId);
  };

  const handleSave = (categoryId) => {
    setEditableCategoryId(null);
    // You can add logic here to save the edited category data (if needed).
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Container maxWidth="lg">
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
                Categories
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

        <Container sx={{ paddingTop: 2 }} maxWidth="lg">
          <Grid
            sx={{ marginRight: 6 }}
            container
            justifyContent="flex-end"
            spacing={2}
          >
            <Grid item>
              <Button
                component={Link}
                to="/admin/categories/add"
                variant="contained"
                endIcon={<PostAddIcon />}
              >
                Add Category
              </Button>
            </Grid>
          </Grid>
        </Container>
        <Grid item xs={12}>
          <Container sx={{ py: 8, paddingTop: 2 }} maxWidth="lg">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ fontSize: '18px' }}>
                      Category ID
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: '18px' }} align="left">
                      Category Title
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: '18px' }} align="center">
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <StyledTableRow key={category.id}>
                      <StyledTableCell component="th" scope="row">
                        {editableCategoryId === category.id ? (
                          <TextField
                            sx={{ width: '100%' }}
                            value={category.id}
                            onChange={(e) => {
                              const updatedCategories = categories.map((c) =>
                                c.id === category.id
                                  ? { ...c, id: e.target.value }
                                  : c
                              );
                              setCategories(updatedCategories);
                            }}
                          />
                        ) : (
                          category.id
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {editableCategoryId === category.id ? (
                          <TextField
                            sx={{ width: '100%' }}
                            value={category.title}
                            onChange={(e) => {
                              const updatedCategories = categories.map((c) =>
                                c.id === category.id
                                  ? { ...c, title: e.target.value }
                                  : c
                              );
                              setCategories(updatedCategories);
                            }}
                          />
                        ) : (
                          category.title
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {editableCategoryId === category.id ? (
                          <Button
                            variant="text"
                            color="primary"
                            onClick={() => handleSave(category.id)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="text"
                            onClick={() => handleEdit(category.id)}
                            disabled={editableCategoryId !== null}
                          >
                            Edit
                          </Button>
                        )}
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => handleDelete(category.id)}
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

export default AdminCategories;
