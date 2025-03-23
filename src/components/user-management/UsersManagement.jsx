import { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import UserTable from "./UserTable";
import UserPermissions from "./UserPermissions";
import UserForm from "./UserForm";
import Header from "../random/Header";

const UsersManagement = () => {
  const [users, setUsers] = useState([
    {
      id: "1",
      email: "dr.smith@hospital.com",
      userName: "Dr. Smith",
      type: "DOCTOR",
      specialization: "Cardiology",
      licenseNumber: "DOC12345",
      permissions: {
        canViewPatients: true,
        canEditPatients: true,
        canViewMedicalRecords: true,
        canEditMedicalRecords: true,
        canPrescribeMedication: true,
        canScheduleAppointments: true,
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      email: "nurse.johnson@hospital.com",
      userName: "Nurse Johnson",
      type: "NURSE",
      permissions: {
        canViewPatients: true,
        canEditPatients: false,
        canViewMedicalRecords: true,
        canEditMedicalRecords: false,
        canPrescribeMedication: false,
        canScheduleAppointments: true,
      },
      createdAt: new Date().toISOString(),
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleSaveUser = (user) => {
    if (user.id) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      const newUser = {
        ...user,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        permissions: {
          canViewPatients: false,
          canEditPatients: false,
          canViewMedicalRecords: false,
          canEditMedicalRecords: false,
          canPrescribeMedication: false,
          canScheduleAppointments: false,
        },
      };
      setUsers([...users, newUser]);
    }
    setIsFormOpen(false);
  };

  const handleSavePermissions = (userId, permissions) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, permissions } : user
      )
    );
    setIsPermissionsOpen(false);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Header
          title={"User Management"}
          subTitle={"Manage your staff accounts and permissions"}
        ></Header>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>

      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onManagePermissions={handleManagePermissions}
      />

      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {isPermissionsOpen && selectedUser && (
        <UserPermissions
          user={selectedUser}
          onSave={(permissions) =>
            handleSavePermissions(selectedUser.id, permissions)
          }
          onCancel={() => setIsPermissionsOpen(false)}
        />
      )}
    </Box>
  );
};

export default UsersManagement;
