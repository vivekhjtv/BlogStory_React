import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
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
import { deleteUsers, getUserData } from '../../api';

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

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [editableUserId, setEditableUserId] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getUserData();
      console.log(data);
      setUsers(data);
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

  const handleEdit = (userId) => {
    setEditableUserId(userId);
  };

  const handleSave = () => {
    setEditableUserId(null);
    // You can add logic here to save the edited user data (if needed).
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUsers(userId);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
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
                Users
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
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                component={Link}
                to="/admin/user/add"
                variant="contained"
                endIcon={<PersonAddAltIcon />}
              >
                Add User
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
                      User ID
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: '18px' }} align="left">
                      User Name
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: '18px' }} align="left">
                      User Email
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: '18px' }} align="center">
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <StyledTableRow key={user.id}>
                      <StyledTableCell component="th" scope="row">
                        {user.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {editableUserId === user.id ? (
                          <TextField
                            sx={{ width: '100%' }}
                            value={user.name}
                            onChange={(e) => {
                              const updatedUsers = users.map((u) =>
                                u.id === user.id
                                  ? { ...u, name: e.target.value }
                                  : u
                              );
                              setUsers(updatedUsers);
                            }}
                          />
                        ) : (
                          user.name
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {editableUserId === user.id ? (
                          <TextField
                            sx={{ width: '100%' }}
                            value={user.role}
                            onChange={(e) => {
                              const updatedUsers = users.map((u) =>
                                u.id === user.id
                                  ? { ...u, role: e.target.value }
                                  : u
                              );
                              setUsers(updatedUsers);
                            }}
                          />
                        ) : (
                          user.role
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {editableUserId === user.id ? (
                          <Button
                            variant="text"
                            color="primary"
                            onClick={handleSave}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="text"
                            onClick={() => handleEdit(user.id)}
                            disabled={editableUserId !== null}
                          >
                            Edit
                          </Button>
                        )}
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => handleDelete(user.id)}
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

export default AdminUser;
