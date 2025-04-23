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
import { useDispatch, useSelector } from "react-redux";
import {
  attachPermission,
  fetchPermissions,
} from "../../redux/permissionsSlice";
import axios from "axios";

const url = import.meta.env.VITE_BACK_END_URL;
const UserPermissions = ({ user, onCancel }) => {
  const dispatch = useDispatch();
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const fetchUserPermissions = async () => {
    try {
      if (user) {
        const res = await axios.get(`${url}/api/permitions?id=${user.id}`);
        const permissions = res.data.permitions.map((permission) => {
          return {
            id: permission.PermitionID,
            name: permission.NamePermition,
          };
        });
        setUserPermissions(permissions);
      }
    } catch (error) {
      console.error("Error fetching user permissions:", error);
    }
  };

  useEffect(() => {
    fetchUserPermissions();
  }, [user]);

  const { permissions } = useSelector((state) => state.permissions);

  const handleSavePermissions = async (userId, permissionId) => {
    const attachData = {
      UserID: userId,
      PermitionID: [permissionId],
    };
    await dispatch(attachPermission(attachData)); // wait for attach to complete
    await fetchUserPermissions(); // then refetch
  };

  const permissionGroups = [
    {
      title: "Patient Management",
      permissions: permissions
        .filter(
          (permission) =>
            /patient/i.test(permission.name) && !/record/i.test(permission.name)
        )
        .map((permission) => ({
          id: permission.id,
          label: permission.name,
        })),
    },
    {
      title: "Medical Records",
      permissions: permissions
        .filter((permission) => /record/i.test(permission.name))
        .map((permission) => ({
          id: permission.id,
          label: permission.name,
        })),
    },
    {
      title: "Appointments",
      permissions: permissions
        .filter((permission) => /appointment/i.test(permission.name))
        .map((permission) => ({
          id: permission.id,
          label: permission.name,
        })),
    },
    {
      title: "Services",
      permissions: permissions
        .filter((permission) => /service/i.test(permission.name))
        .map((permission) => ({
          id: permission.id,
          label: permission.name,
        })),
    },
    {
      title: "Administrative",
      permissions: permissions
        .filter(
          (permission) =>
            /calender/i.test(permission.name) ||
            /office/i.test(permission.name) ||
            /user/i.test(permission.name) ||
            /rapport/i.test(permission.name)
        )
        .map((permission) => ({
          id: permission.id,
          label: permission.name,
        })),
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
                      checked={userPermissions.some(
                        (perm) => perm.id === permission.id
                      )}
                      onChange={() => {
                        handleSavePermissions(user.id, permission.id);
                      }}
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
      </DialogActions>
    </Dialog>
  );
};

export default UserPermissions;
