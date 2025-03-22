// Certifications.jsx
import React from "react";
import {
  EmojiEvents as AwardIcon,
  Shield as ShieldIcon,
} from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import CardContainer from "./CardContainer";
import Grid from "@mui/material/Grid2";

const Certifications = ({ certifications }) => {
  return (
    <CardContainer title="Certifications" icon={AwardIcon}>
      <Grid container spacing={2}>
        {certifications.map((cert, index) => (
          <Grid item size={{ xs: 12, md: 6 }} key={index}>
            <Paper sx={{ p: 2, display: "flex", alignItems: "center" }}>
              <ShieldIcon color="primary" sx={{ mr: 1.5 }} />
              <Typography
                variant="body1"
                fontWeight="medium"
                color="text.primary"
              >
                {cert}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </CardContainer>
  );
};

export default Certifications;
