// FormField.jsx
import React from "react";
import { TextField, Typography, Box } from "@mui/material";

const FormField = ({
  id,
  label,
  value,
  isEditing,
  onChange,
  isTextarea = false,
  rows = 3,
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      {isEditing ? (
        <TextField
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          multiline={isTextarea}
          rows={isTextarea ? rows : 1}
          fullWidth
          variant="outlined"
          size="small"
        />
      ) : (
        <Typography variant="body1" fontWeight="medium" color="text.primary">
          {value}
        </Typography>
      )}
    </Box>
  );
};

export default FormField;