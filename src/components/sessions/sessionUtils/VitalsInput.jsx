import React from "react";
import {
    Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// Component for General Vitals Input
const VitalsInput = ({ sign, formData, handleChange }) => {
  console.log(formData)
  // if (sign.name === "Blood Pressure") {
  //   return (
  //     <Box className="flex gap-2 items-center">
  //       <Typography variant="body2" className="!font-medium">
  //         {sign.name}:
  //       </Typography>
  //       <TextField
  //         type={sign.type}
  //         variant="standard"
  //         size="small"
  //         name="BloodPressure1"
  //         value={formData.find((vital) => vital.name === "BloodPressure1")?.value || ""}
  //         onChange={handleChange}
  //         sx={{ width: "100px" }}
  //       />
  //       /
  //       <TextField
  //         type={sign.type}
  //         variant="standard"
  //         size="small"
  //         name="BloodPressure2"
  //         value={formData.find((vital) => vital.name === "BloodPressure2")?.value || ""}
  //         onChange={handleChange}
  //         sx={{ width: "100px" }}
  //         InputProps={{
  //           endAdornment: sign.unit && (
  //             <InputAdornment
  //               sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
  //               position="end"
  //             >
  //               {sign.unit}
  //             </InputAdornment>
  //           ),
  //         }}
  //       />
  //     </Box>
  //   );
  // }

  return (
    <Stack direction={"row"} alignItems={"center"} gap={2}>
      <Typography variant="body2" className="!font-medium">
        {sign.name}:
      </Typography>
      <TextField
        type={sign.type}
        variant="standard"
        size="small"
        name={sign.name}
        value={formData.find((vital) => vital.name === sign.name)?.value || ""}
        onChange={handleChange}
        sx={{ width: "150px" }}
        InputProps={{
          endAdornment: sign.unit && (
            <InputAdornment
              sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
              position="end"
            >
              {sign.unit}
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default VitalsInput;
