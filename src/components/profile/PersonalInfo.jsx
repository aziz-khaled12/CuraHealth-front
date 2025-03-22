// PersonalInfo.jsx
import React from "react";
import { Person as UserIcon } from "@mui/icons-material";
import { TextField, Typography, Box, Stack, Alert } from "@mui/material";
import CardContainer from "./CardContainer";
import FormField from "./FormField";

const PersonalInfo = ({ doctorData, isEditing, handleChange }) => {
  return (
    <CardContainer title="Personal Information" icon={UserIcon}>
      <Stack spacing={3}>
        <FormField
          id="name"
          label="Full Name"
          value={doctorData.name}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <Box>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            value={doctorData.email}
            disabled
            fullWidth
            variant="outlined"
          />
          <Alert severity="info" sx={{ mt: 1, py: 0 }}>
            <Typography variant="caption">Email cannot be changed</Typography>
          </Alert>
        </Box>

        <FormField
          id="phone"
          label="Phone Number"
          value={doctorData.phone}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <FormField
          id="address"
          label="Address"
          value={doctorData.address}
          isEditing={isEditing}
          onChange={handleChange}
          isTextarea={true}
          rows={2}
        />
      </Stack>
    </CardContainer>
  );
};

export default PersonalInfo;
