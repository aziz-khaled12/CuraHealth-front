// AccountSettings.jsx
import React from "react";
import { Person as UserIcon, Security as SecurityIcon } from "@mui/icons-material";
import { TextField, FormControlLabel, Checkbox, FormGroup, Select, MenuItem, InputLabel, FormControl, Alert, Typography, Box, Stack } from "@mui/material";
import CardContainer from "./CardContainer";

const AccountSettings = () => {
  return (
    <CardContainer title="Account Settings" icon={UserIcon}>
      <Stack spacing={3}>
        <Box>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value="••••••••••••"
            disabled
            fullWidth
            variant="outlined"
          />
          <Alert severity="info" sx={{ mt: 1, py: 0 }}>
            <Typography variant="caption">Password cannot be changed here</Typography>
          </Alert>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Notification Preferences
          </Typography>
          <FormGroup>
            <FormControlLabel 
              control={<Checkbox defaultChecked color="primary" />} 
              label="Email notifications" 
            />
            <FormControlLabel 
              control={<Checkbox defaultChecked color="primary" />} 
              label="SMS notifications" 
            />
          </FormGroup>
        </Box>

        <FormControl fullWidth>
          <InputLabel id="timezone-label">Timezone</InputLabel>
          <Select
            labelId="timezone-label"
            id="timezone"
            defaultValue="est"
            label="Timezone"
          >
            <MenuItem value="est">Eastern Time (ET)</MenuItem>
            <MenuItem value="cst">Central Time (CT)</MenuItem>
            <MenuItem value="mst">Mountain Time (MT)</MenuItem>
            <MenuItem value="pst">Pacific Time (PT)</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </CardContainer>
  );
};

export default AccountSettings;