import React from 'react';
import { TextField } from '@mui/material';

const FunctionalSignsForm = ({ formData, setFormData }) => {
  return (
    <>
      <TextField
        label="Functional Signs"
        value={formData.functionalSigns}
        onChange={(e) => setFormData({ ...formData, functionalSigns: e.target.value })}
        fullWidth
      />
    </>
  );
};

export default FunctionalSignsForm;
