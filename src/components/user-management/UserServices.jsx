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
import { attachService, deattachService, fetchServices } from "../../redux/servicesSlice";
import axios from "axios";

const UserServices = ({ user, onCancel }) => {
  const url = import.meta.env.VITE_BACK_END_URL;

  const { services } = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const [selectedServices, setSelectedServices] = useState([]);

  const fetchUserServices = async () => {
    try {
      const res = await axios.get(`${url}/api/services?UserID=${user.id}`);
      setSelectedServices(res.data.response.map((s) => s.ServiceID));
    } catch (err) {
      console.log("Error fetching user services:", err);
    }
  };

  useEffect(() => {
    dispatch(fetchServices());
    fetchUserServices();
  }, []);

  const handleServiceChange = (id) => (event) => {
    const isChecked = event.target.checked;
    
    if (isChecked) {
      // Add service if checked
      setSelectedServices((prev) => [...prev, id]);
      dispatch(attachService({ ServiceID: id, UserID: user.id }));
    } else {
      // Remove service if unchecked
      setSelectedServices((prev) => prev.filter(serviceId => serviceId !== id));
      // You might need a detachService action here if your API supports it
      dispatch(deattachService({ ServiceID: id, UserID: user.id }));
    }
  };

  useEffect(() => {
    console.log("Selected Services:", selectedServices);
  }, [selectedServices]);

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
                      checked={selectedServices.includes(service.id)}
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
          <Button sx={{textTransform: "none"}} onClick={onCancel} color="secondary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserServices;