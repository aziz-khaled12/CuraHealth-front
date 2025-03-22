// Awards.jsx
import React from "react";
import { EmojiEvents as AwardIcon, Loop as LoopIcon } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CardContainer from "./CardContainer";

const Awards = ({ awards }) => {
  return (
    <CardContainer title="Awards & Recognition" icon={AwardIcon}>
      <List disablePadding>
        {awards.map((award, index) => (
          <ListItem key={index} sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LoopIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary={award} 
              primaryTypographyProps={{ color: "text.secondary" }}
            />
          </ListItem>
        ))}
      </List>
    </CardContainer>
  );
};

export default Awards;