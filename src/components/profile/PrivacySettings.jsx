// PrivacySettings.jsx
import React from "react";
import { Shield as ShieldIcon } from "@mui/icons-material";
import { Box, Typography, Select, MenuItem, Divider, Stack } from "@mui/material";
import CardContainer from "./CardContainer";

const PrivacySettings = () => {
  return (
    <CardContainer title="Privacy Settings" icon={ShieldIcon}>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="medium" color="text.primary">
              Profile Visibility
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Control who can see your profile information
            </Typography>
          </Box>
          <Select
            defaultValue="public"
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
            <MenuItem value="patients">Patients Only</MenuItem>
          </Select>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="medium" color="text.primary">
              Contact Information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Control who can see your contact details
            </Typography>
          </Box>
          <Select
            defaultValue="staff"
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="staff">Staff Only</MenuItem>
            <MenuItem value="patients">Patients & Staff</MenuItem>
            <MenuItem value="public">Public</MenuItem>
          </Select>
        </Box>
      </Stack>
    </CardContainer>
  );
};

export default PrivacySettings;