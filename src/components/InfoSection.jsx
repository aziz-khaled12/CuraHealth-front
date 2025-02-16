import { Box, Typography } from "@mui/material";
import React from "react";

const InfoSection = ({ title, height }) => (
  <Box className={`w-full bg-white border border-[#B4B4B4] rounded-lg h-[${height}] p-4`}>
    <Typography className="font-semibold text-lg">{title}</Typography>
  </Box>
);

export default InfoSection;
