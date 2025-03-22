// Biography.jsx
import React from "react";
import { Description as FileTextIcon } from "@mui/icons-material";
import { TextField, Typography } from "@mui/material";
import CardContainer from "./CardContainer";

const Biography = ({ doctorData, isEditing, handleChange }) => {
  return (
    <CardContainer title="Biography" icon={FileTextIcon}>
      {isEditing ? (
        <TextField
          id="bio"
          name="bio"
          value={doctorData.bio}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />
      ) : (
        <Typography variant="body1" color="text.secondary">
          {doctorData.bio}
        </Typography>
      )}
    </CardContainer>
  );
};

export default Biography;