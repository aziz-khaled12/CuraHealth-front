import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { attachService, fetchServices } from "../../redux/servicesSlice";

const UserServices = ({ user, onCancel }) => {
  useEffect(() => {
    dispatch(fetchServices());
  }, []);
  const { services } = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const [selectedServices, setSelectedServices] = useState({});

  const handleServiceChange = (id) => (event) => {
    setSelectedServices((prev) => ({
      ...prev,
      [id]: event.target.checked,
    }));
    dispatch(attachService({ ServiceID: id, UserID: user.id }));
  };

  const handleSubmit = () => {
    console.log(" Services:", services);
  };

  return (
    <div>
      <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Manage Services for {user.userName}</DialogTitle>
        <DialogContent>
          <div key="Services" style={{ marginBottom: 16 }}>
            <Typography variant="subtitle1">Services</Typography>
            <Divider style={{ marginBottom: 8 }} />
            <FormGroup>
              {services.map((service) => (
                <FormControlLabel
                  key={service.id}
                  control={
                    <Checkbox
                      checked={services[service.id] || false}
                      onChange={handleServiceChange(service.id)}
                    />
                  }
                  label={service.name}
                />
              ))}
            </FormGroup>
          </div>
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
    </div>
  );
};

export default UserServices;
