import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { calculateAge } from "../../utils/TimeManipulationFunctions";
import { format } from "date-fns";

const PatientInfo = ({ patientId }) => {
  const patient = useSelector((state) => state.patients.patients.find(p => p.PatientID === patientId));
  const age = calculateAge(patient?.BirthDay);
  console.log("Patient Info: ", patient);
  return (
    <Box className="w-full rounded-lg bg-white flex items-center border border-[#B4B4B4] gap-3 h-[20%] p-4">
      <Box className="w-[80px] h-[80px] rounded-full bg-primary" />
      <Box className="flex flex-col gap-1">
        <Typography className="!font-semibold !text-lg">
          {`${patient?.FirstName || "John"} ${patient?.LastName || "Doe"}`}
        </Typography>
        <Typography className="!font-normal !text-sm">
          {`${patient.Sex === 'M' ? "Male" : "Female"}`} · {`${age}y`} ({format(new Date(patient?.BirthDay), "dd-MM-yyyy")})
        </Typography>
        <Typography className="!font-normal !text-sm">{patient.PhoneNum}</Typography>
      </Box>
    </Box>
  );
};

export default PatientInfo;
