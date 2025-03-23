// ProfessionalInfo.jsx
import React from "react";
import { Business as BuildingIcon } from "@mui/icons-material";
import CardContainer from "./CardContainer";
import FormField from "./FormField";
import { Stack } from "@mui/material";

const ProfessionalInfo = ({ doctorData, handleChange }) => {
  return (
    <CardContainer title="Professional Information" icon={BuildingIcon}>
      <Stack spacing={3}>
        <FormField
          id="specialization"
          label="Specialization"
          value={doctorData.specialization}
          onChange={handleChange}
        />

        <FormField
          id="licenseNumber"
          label="License Number"
          value={doctorData.licenseNumber}
          onChange={handleChange}
        />

        <FormField
          id="hospital"
          label="Hospital/Clinic"
          value={doctorData.hospital}
          onChange={handleChange}
        />

        <FormField
          id="experience"
          label="Experience"
          value={doctorData.experience}
          onChange={handleChange}
        />
      </Stack>
    </CardContainer>
  );
};

export default ProfessionalInfo;