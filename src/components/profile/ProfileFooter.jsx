// ProfileFooter.jsx
import React from "react";
import { Box, Typography, Button, Divider, Stack } from "@mui/material";

const ProfileFooter = ({ isEditing, handleCancel, handleSave }) => {
  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      pt: 3, 
      px: 3, 
      pb: 3 
    }}>
      <Typography variant="body2" color="text.secondary">
        Last updated: March 15, 2024
      </Typography>
      {isEditing && (
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default ProfileFooter;