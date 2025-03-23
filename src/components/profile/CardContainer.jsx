// CardContainer.jsx
import React from "react";
import { Paper, Typography, Divider, Box } from "@mui/material";

const CardContainer = ({ title, icon: Icon, children }) => {
  return (
    <Paper sx={{ p: 2.5, boxShadow: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Icon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" color="text.primary">
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Paper>
  );
};

export default CardContainer;