import React from 'react';
import { TextField } from '@mui/material';

const GeneralSignsForm = ({ formData, setFormData }) => {
  return (
    <>
      <TextField
        label="Height"
        value={formData.height}
        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
        fullWidth
      />
      <TextField
        label="Weight"
        value={formData.weight}
        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        label="Blood Pressure"
        value={formData.bloodPressure}
        onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
        fullWidth
        sx={{ mt: 2 }}
      />
    </>
  );
};

export default GeneralSignsForm;
