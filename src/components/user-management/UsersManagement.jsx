import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import UserTable from "./UserTable";
import UserPermissions from "./UserPermissions";
import UserForm from "./UserForm";
import UserServices from "./UserServices";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/usersSlice";
import { fetchTypes } from "../../redux/userDataSlice";

const UsersManagement = () => {
  const dispatch = useDispatch();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  useEffect(() => {
    dispatch(fetchTypes());
    dispatch(fetchUsers());
  }, []);
  
  const { users } = useSelector((state) => state.users);
  const { types } = useSelector((state) => state.userData);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleManagePermissions = (user) => {
    setSelectedUser(user);
    setIsPermissionsOpen(true);
  };
  const handleManageServices = (user) => {
    setSelectedUser(user);
    setIsServicesOpen(true);
  };





  return (
    <Box>
      <UserTable
        users={users}
        onAdd={handleAddUser}
        onEdit={handleEditUser}
        onManagePermissions={handleManagePermissions}
        onManageServices={handleManageServices}
      />

      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onCancel={() => setIsFormOpen(false)}
          types={types}
        />
      )}

      {isPermissionsOpen && selectedUser && (
        <UserPermissions
          user={selectedUser}
          onCancel={() => setIsPermissionsOpen(false)}
        />
      )}
      {isServicesOpen && selectedUser && (
        <UserServices
          user={selectedUser}
          onCancel={() => setIsServicesOpen(false)}
        />
      )}
    </Box>
  );
};

export default UsersManagement;
