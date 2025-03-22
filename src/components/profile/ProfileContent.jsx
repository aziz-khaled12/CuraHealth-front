// ProfileContent.jsx
import React from "react";
import { Grid, Box } from "@mui/material";
import PersonalInfo from "./PersonalInfo";
import Biography from "./Biography";
import ProfessionalInfo from "./ProfessionalInfo";
import Languages from "./Languages";
import Awards from "./Awards";
import Certifications from "./Certifications";
import Education from "./Education";
import AccountSettings from "./AccountSettings";
import PrivacySettings from "./PrivacySettings";

const ProfileContent = ({ activeTab, doctorData, isEditing, handleChange }) => {
  if (activeTab === "profile") {
    return (
      <Box sx={{ pt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <PersonalInfo
                doctorData={doctorData}
                isEditing={isEditing}
                handleChange={handleChange}
              />
              <Biography
                doctorData={doctorData}
                isEditing={isEditing}
                handleChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <ProfessionalInfo
                doctorData={doctorData}
                isEditing={isEditing}
                handleChange={handleChange}
              />
              <Languages languages={doctorData.languages} />
              <Awards awards={doctorData.awards} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (activeTab === "qualifications") {
    return (
      <Box sx={{ pt: 4 }}>
        <Certifications certifications={doctorData.certifications} />
        <Box sx={{ mt: 3 }}>
          <Education />
        </Box>
      </Box>
    );
  }

  if (activeTab === "settings") {
    return (
      <Box sx={{ pt: 4 }}>
        <AccountSettings />
        <Box sx={{ mt: 3 }}>
          <PrivacySettings />
        </Box>
      </Box>
    );
  }

  return null;
};

export default ProfileContent;