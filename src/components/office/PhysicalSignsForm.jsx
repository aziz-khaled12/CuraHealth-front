import React from 'react';
import { TextField } from '@mui/material';

const PhysicalSignsForm = ({ formData, setFormData }) => {
  return (
    <>
      <TextField
        label="Physical Signs"
        value={formData.physicalSigns}
        onChange={(e) => setFormData({ ...formData, physicalSigns: e.target.value })}
        fullWidth
      />
    </>
  );
};

export default PhysicalSignsForm;
