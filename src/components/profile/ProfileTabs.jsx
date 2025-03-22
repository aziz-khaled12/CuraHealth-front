// ProfileTabs.jsx
import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <Box sx={{ borderRadius: 1, p: 0.5 }}>
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab value="profile" label="Profile" />
        <Tab value="qualifications" label="Qualifications" />
        <Tab value="settings" label="Settings" />
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;