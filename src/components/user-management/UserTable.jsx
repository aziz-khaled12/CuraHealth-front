import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
  Box,
  Typography,
  Divider,
} from "@mui/material";
import {
  MoreHoriz,
  Edit,
  Delete,
  Shield,
  Search,
  Close,
  MedicalServices,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/usersSlice";
import { Add as AddIcon } from "@mui/icons-material";

const UserTable = ({
  onEdit,
  onManagePermissions,
  onManageServices,
  onAdd,
}) => {
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

  useEffect(() => {
    console.log("users: ", users);
  }, [users]);

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

  return (
    <div className="flex flex-col h-full w-full">
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
          sx={{ textTransform: "none" }}
        >
          Add User
        </Button>
      </div>

      <Box className="flex-grow w-full h-full">
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          autoPageSize
          getRowId={(row) => row.id}
          sx={{
            height: "100%",
            width: "100%",
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#fafafa",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#fff",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #f0f0f0",
              backgroundColor: "#fafafa",
            },
            "& .MuiDataGrid-toolbarContainer": {
              padding: "8px",
              backgroundColor: "#fafafa",
            },
          }}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: "8px",
            minWidth: "200px",
            padding: "4px 0",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          },
        }}
        MenuListProps={{
          sx: {
            padding: 0,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => onEdit(menuUser)}
          sx={{
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <Edit fontSize="small" sx={{ color: "text.secondary" }} />
          <Typography variant="body2">Edit</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => onManagePermissions(menuUser)}
          sx={{
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <Shield fontSize="small" sx={{ color: "text.secondary" }} />
          <Typography variant="body2">Permissions</Typography>
        </MenuItem>

        {menuUser?.type === "Doctor" && (
          <MenuItem
            onClick={() => onManageServices(menuUser)}
            sx={{
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <MedicalServices
              fontSize="small"
              sx={{ color: "text.secondary" }}
            />
            <Typography variant="body2">Services</Typography>
          </MenuItem>
        )}

        <Divider sx={{ my: "4px" }} />

        <MenuItem
          onClick={handleMenuClose}
          sx={{
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <Close fontSize="small" />
          <Typography variant="body2">Close</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserTable;
