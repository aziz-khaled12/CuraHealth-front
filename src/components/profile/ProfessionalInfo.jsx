// ProfessionalInfo.jsx
import React from "react";
import { Business as BuildingIcon } from "@mui/icons-material";
import CardContainer from "./CardContainer";
import FormField from "./FormField";
import { Stack } from "@mui/material";

const ProfessionalInfo = ({ doctorData, isEditing, handleChange }) => {
  return (
    <CardContainer title="Professional Information" icon={BuildingIcon}>
      <Stack spacing={3}>
        <FormField
          id="specialization"
          label="Specialization"
          value={doctorData.specialization}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <FormField
          id="licenseNumber"
          label="License Number"
          value={doctorData.licenseNumber}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <FormField
          id="hospital"
          label="Hospital/Clinic"
          value={doctorData.hospital}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <FormField
          id="experience"
          label="Experience"
          value={doctorData.experience}
          isEditing={isEditing}
          onChange={handleChange}
        />
      </Stack>
    </CardContainer>
  );
};

export default ProfessionalInfo;