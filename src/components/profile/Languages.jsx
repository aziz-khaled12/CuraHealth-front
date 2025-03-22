// Languages.jsx
import React from "react";
import { EmojiEvents as AwardIcon } from "@mui/icons-material";
import { Chip, Box } from "@mui/material";
import CardContainer from "./CardContainer";

const Languages = ({ languages }) => {
  return (
    <CardContainer title="Languages" icon={AwardIcon}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {languages.map((lang, index) => (
          <Chip
            key={index}
            label={lang}
            variant="filled"
            color="primary"
          />
        ))}
      </Box>
    </CardContainer>
  );
};

export default Languages;