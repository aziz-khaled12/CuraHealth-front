import { Divider } from "@mui/material";
import React from "react";
import { calculateAge } from "../../../utils/TimeManipulationFunctions";
import { format } from "date-fns";

const PatientInfo = ({ patient }) => {
  console.log(patient)
  const patientFields = [
    {
      label: "Birthday",
      value: format(patient.BirthDay, "MMMM do, yyyy"),
    },
    {
      label: "Phone Number",
      value: patient.PhoneNum,
    },
    {
      label: "Email",
      value: patient.Email,
    },
    {
      label: "Address",
      value: patient.Address,
    },
    {
      label: "Etat Civil",
      value: patient.EtatCivileName,
    },
    {
      label: "National Id Number",
      value: patient.NationalId,
    },
  ];

  const age = calculateAge(patient.BirthDay);

  return (
    <div className="flex-[7] bg-white rounded-xl h-fit overflow-hidden shadow-md border border-[#B4B4B4] py-8 px-6">
      <div className="flex gap-4 items-center">
        <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center"></div>
        <div>
          <h1 className="font-semibold text-2xl">{`${patient.FirstName} ${patient.LastName}`}</h1>
          <p className="text-sm text-gray-500">{`${age} years • ${
            patient.Sex === 'M' ? "Male" : "Female"
          } • ${patient.BloodTypeName}`}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <div className="flex gap-2 flex-col flex-1">
          <h1 className="font-medium text-primary text-lg">Personal Inforamtion</h1>
          <Divider orientation="horizontal" flexItem></Divider>
          <div className="w-full flex flex-col text-sm gap-4">
            {patientFields.map((field, index) => (
              <div key={index} className="w-full flex items-center">
                <p className="flex-1 text-gray-500">{field.label}:</p>
                <p className="flex-[2]">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-col flex-1">
          <h1 className="font-medium text-primary text-lg">Medical Inforamtion</h1>
          <Divider orientation="horizontal" flexItem></Divider>
          <div className="w-full flex flex-col text-sm gap-4">
            <div className="w-full flex items-center">
              <p className="flex-1 text-gray-500">Blood Type:</p>
              <p className="flex-[2]">{patient.BloodTypeName}</p>
            </div>

            <div className="w-full flex items-center">
              <p className="flex-1 text-gray-500">Allergies:</p>
              <div className="flex-[2] flex gap-2">
                {/* {patient.allergies.map((allergy, index) => (
                  <Chip
                    size="small"
                    sx={{ fontSize: "12px" }}
                    key={index}
                    variant="outlined"
                    label={allergy}
                    color="error"
                  />
                ))} */}
              </div>
            </div>

            <div className="w-full flex items-center">
              <p className="flex-1 text-gray-500">Chronic Conditions:</p>
              <div className="flex-[2] flex gap-2">
                {/* {patient.chronicConditions.map((condition, index) => (
                  <Chip
                    size="small"
                    sx={{ fontSize: "12px" }}
                    key={index}
                    variant="outlined"
                    label={condition}
                    color="primary"
                  />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
