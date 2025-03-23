import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
} from "@mui/material";

const UserPermissions = ({ user, onSave, onCancel }) => {
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    if (user && user.permissions) {
      setPermissions({ ...user.permissions });
    }
  }, [user]);

  const handlePermissionChange = (permission) => (event) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: event.target.checked,
    }));
  };

  const handleSubmit = () => {
    onSave(permissions);
  };

  const permissionGroups = [
    {
      title: "Patient Management",
      permissions: [
        { id: "canViewPatients", label: "View Patients" },
        { id: "canEditPatients", label: "Edit Patients" },
      ],
    },
    {
      title: "Medical Records",
      permissions: [
        { id: "canViewMedicalRecords", label: "View Medical Records" },
        { id: "canEditMedicalRecords", label: "Edit Medical Records" },
      ],
    },
    {
      title: "Clinical Operations",
      permissions: [
        { id: "canPrescribeMedication", label: "Prescribe Medication" },
        { id: "canScheduleAppointments", label: "Schedule Appointments" },
      ],
    },
  ];

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Permissions for {user.userName}</DialogTitle>
      <DialogContent>
        {permissionGroups.map((group) => (
          <div key={group.title} style={{ marginBottom: 16 }}>
            <Typography variant="subtitle1">{group.title}</Typography>
            <Divider style={{ marginBottom: 8 }} />
            <FormGroup>
              {group.permissions.map((permission) => (
                <FormControlLabel
                  key={permission.id}
                  control={
                    <Checkbox
                      checked={permissions[permission.id] || false}
                      onChange={handlePermissionChange(permission.id)}
                    />
                  }
                  label={permission.label}
                />
              ))}
            </FormGroup>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save Permissions
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserPermissions;