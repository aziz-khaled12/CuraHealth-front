// ProfileHeader.jsx
import React from "react";
import { 
  Avatar, 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Stack, 
  Paper
} from "@mui/material";
import { 
  EmojiEvents as AwardIcon, 
  CalendarMonth as CalendarIcon, 
  Shield as ShieldIcon, 
  Save as SaveIcon, 
  Close as CloseIcon,
  Edit as EditIcon
} from "@mui/icons-material";

const ProfileHeader = ({ doctorData, isEditing, handleEdit, handleCancel, handleSave }) => {
  return (
    <Box sx={{ position: "relative", py: 2, px: 6 }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "flex-end" }, gap: 4 }}>
        <Avatar
          src="/placeholder.svg?height=128&width=128"
          alt={doctorData.name}
          sx={{ 
            height: 128, 
            width: 128, 
            border: 4, 
            borderColor: "common.white", 
            boxShadow: 2, 
            bgcolor: "primary.main", 
            fontSize: "1.5rem"
          }}
        >
          {doctorData.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </Avatar>

        <Box sx={{ flexGrow: 1, pt: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {doctorData.name}
          </Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <AwardIcon color="primary" sx={{ fontSize: 20 }} />
            <Typography variant="body1" color="text.secondary">
              {doctorData.specialization}
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: "wrap", gap: 1 }}>
            <Chip 
              icon={<ShieldIcon fontSize="small" />} 
              label={`License: ${doctorData.licenseNumber}`}
              variant="outlined"
              color="primary"
              size="small"
            />
            <Chip 
              icon={<CalendarIcon fontSize="small" />} 
              label={`${doctorData.experience} Experience`}
              variant="outlined"
              color="primary"
              size="small"
            />
          </Stack>
        </Box>
        
        {!isEditing ? (
          <Button
            onClick={handleEdit}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            sx={{ 
              position: { xs: "absolute", md: "static" }, 
              top: { xs: 16 }, 
              right: { xs: 16 }
            }}
          >
            Edit Profile
          </Button>
        ) : (
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              position: { xs: "absolute", md: "static" }, 
              top: { xs: 16 }, 
              right: { xs: 16 }
            }}
          >
            <Button
              onClick={handleCancel}
              variant="outlined"
              color="primary"
              startIcon={<CloseIcon />}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default ProfileHeader;