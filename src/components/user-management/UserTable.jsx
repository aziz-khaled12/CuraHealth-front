import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { MoreHoriz, Edit, Delete, Shield, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/usersSlice";
import { Add as AddIcon } from "@mui/icons-material";


const UserTable = ({ onEdit, onDelete, onManagePermissions, onAdd }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [userToDelete, setUserToDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUser, setMenuUser] = useState(null);


 
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const { users } = useSelector((state) => state.users);

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setMenuUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUser(null);
  };

  const confirmDelete = (userId) => {
    setUserToDelete(userId);
  };

  const handleDeleteConfirmed = () => {
    if (userToDelete) {
      onDelete(userToDelete);
      setUserToDelete(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      (filterType === "Doctor" && user.type === "Doctor") ||
      (filterType === "Nurse" && user.type === "Nurse");

    return matchesSearch && matchesFilter;
  });

  const columns = [
    { field: "userName", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "specialization", headerName: "Specialization", flex: 1 },
    { field: "licenseNumber", headerName: "License", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
            <MoreHoriz />
          </IconButton>
        </>
      ),
    },
  ];

  console.log("filteredUsers: ", filteredUsers);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <div className="w-full flex items-cnter justify-between mb-4">
        <div className="flex items-center gap-4">
          <TextField
            label="Search users"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search fontSize="small" style={{ marginRight: 5 }} />
              ),
            }}
          />
          <FormControl size="small">
            <InputLabel>Filter</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="all">All Users</MenuItem>
              <MenuItem value="Doctor">Doctors</MenuItem>
              <MenuItem value="Nurse">Nurses</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          Add User
        </Button>
      </div>

      <DataGrid
        rows={filteredUsers}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row.id}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => onEdit(menuUser)}>
          <Edit fontSize="small" /> Edit
        </MenuItem>
        <MenuItem onClick={() => onManagePermissions(menuUser)}>
          <Shield fontSize="small" /> Permissions
        </MenuItem>
        <MenuItem onClick={() => confirmDelete(menuUser.id)}>
          <Delete fontSize="small" /> Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserToDelete(null)}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;
