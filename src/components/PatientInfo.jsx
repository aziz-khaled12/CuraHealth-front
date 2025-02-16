import { Box, Typography } from "@mui/material";
import React from "react";

const PatientInfo = () => (
  <Box className="w-full rounded-lg bg-white flex items-center border border-[#B4B4B4] gap-3 h-[20%] p-4">
    <Box className="w-[80px] h-[80px] rounded-full bg-primary" />
    <Box className="flex flex-col gap-1">
      <Typography className="!font-semibold !text-lg">
        Khaled Abd Elaziz
      </Typography>
      <Typography className="!font-normal !text-sm">
        Male · 19y (10-05-2005)
      </Typography>
      <Typography className="!font-normal !text-sm">0561036105</Typography>
    </Box>
  </Box>
);

export default PatientInfo;
