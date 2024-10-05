import React from 'react';
import { TextField } from '@mui/material';

const ConsultationCauseForm = ({ formData, setFormData }) => {
  return (
    <>
      <TextField
        label="Cause of Consultation"
        value={formData.consultationCause}
        onChange={(e) => setFormData({ ...formData, consultationCause: e.target.value })}
        fullWidth
      />
    </>
  );
};

export default ConsultationCauseForm;
