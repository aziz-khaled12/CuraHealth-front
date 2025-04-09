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
        { id: "addPatient", label: "Add Patient" },
        { id: "viewPatientsList", label: "View Patients List" },
        { id: "viewPatientDetails", label: "View Patient Details" },
        { id: "editPatientDetails", label: "Edit Patient Details" },
        { id: "removePatient", label: "Remove Patient" },
      ],
    },
    {
      title: "Medical Records",
      permissions: [
        { id: "viewRecentRecords", label: "View Recent Records" },
        { id: "viewAllRecords", label: "View All Records" },
        { id: "viewRecentRecordDetails", label: "View Recent Record Details" },
        { id: "viewAllRecordDetails", label: "View All Record Details" },
        { id: "downloadRecords", label: "Download Patient Records" },
      ],
    },
    {
      title: "Appointments",
      permissions: [
        { id: "viewAllAppointments", label: "View All Appointments" },
        { id: "viewTodayAppointments", label: "View Today's Appointments" },
        { id: "addAppointment", label: "Add New Appointment" },
        { id: "editAppointments", label: "Modify Appointments" },
        { id: "deleteAppointments", label: "Delete Appointments" },
        { id: "cancelAppointments", label: "Cancel Appointments" },
        { id: "startAppointments", label: "Start Appointments" },
        { id: "endAppointments", label: "End Appointments" },
      ],
    },
    {
      title: "Services",
      permissions: [
        { id: "viewServices", label: "View Services" },
        { id: "addService", label: "Add Service" },
        { id: "deleteService", label: "Delete Service" },
        { id: "editService", label: "Modify Service" },
      ],
    },
    {
      title: "Administrative",
      permissions: [
        { id: "viewCalendar", label: "View Calendar" },
        { id: "viewOffice", label: "View Office" },
        { id: "viewUsers", label: "View Users" },
        { id: "viewRapports", label: "View Rapports" },
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