import { Button, Chip } from "@mui/material";
import React from "react";
import { calculateAge } from "../../../utils/TimeManipulationFunctions";
import { format } from "date-fns";
import {
  Person,
  Phone,
  Email,
  LocationOn,
  Bloodtype,
  Warning,
  LocalHospital,
  Cake,
  Edit,
} from "@mui/icons-material";

const PatientInfo = ({ patient }) => {
  console.log(patient);

  const patientFields = [
    {
      label: "Birthday",
      value: format(patient.BirthDay, "MMMM do, yyyy"),
      icon: <Cake className="w-4 h-4" />,
    },
    {
      label: "Phone Number",
      value: patient.PhoneNum,
      icon: <Phone className="w-4 h-4" />,
    },
    {
      label: "Email",
      value: patient.Email,
      icon: <Email className="w-4 h-4" />,
    },
    {
      label: "Address",
      value: patient.Address,
      icon: <LocationOn className="w-4 h-4" />,
    },
    {
      label: "Etat Civil",
      value: patient.EtatCivileName
        ? patient.EtatCivileName
        : patient.EtatCivile.NameEtatCivile,
      icon: <Person className="w-4 h-4" />,
    },
  ];

  const age = calculateAge(patient.BirthDay);
  const bloodType = patient.BloodTypeName
    ? patient.BloodTypeName
    : patient.BloodType.NameBloodType;

  // Generate initials for avatar
  const initials = `${patient.FirstName?.charAt(0) || ""}${
    patient.LastName?.charAt(0) || ""
  }`;

  return (
    <div className="flex-[7] bg-gradient-to-br from-white to-gray-50 rounded-2xl h-fit overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 p-6">
      {/* Header Section with Enhanced Styling */}

      <div className="w-full mb-6">
        <h1 className="font-bold text-3xl tracking-tight">
          {`${patient.FirstName} ${patient.LastName}`}
        </h1>
      </div>

      {/* Content Section */}
      <div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Person className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="font-semibold text-xl text-gray-800">
                Personal Information
              </h2>
            </div>

            <div className="space-y-4">
              {patientFields.map((field, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                      {field.icon}
                    </div>
                    <span className="text-gray-600 font-medium min-w-0">
                      {field.label}:
                    </span>
                  </div>
                  <div className="flex-[2] text-right">
                    <span className="text-gray-900 font-medium break-all">
                      {field.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <LocalHospital className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="font-semibold text-xl text-gray-800">
                Medical Information
              </h2>
            </div>

            <div className="space-y-4">
              {/* Blood Type */}
              <div className="flex items-center p-2 bg-white rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
                    <Bloodtype className="w-4 h-4" />
                  </div>
                  <span className="text-gray-600 font-medium">Blood Type:</span>
                </div>
                <div className="flex-[2] text-right">
                  <Chip
                    label={bloodType}
                    size="small"
                    sx={{
                      backgroundColor: "#fee2e2",
                      color: "#dc2626",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#fecaca",
                      },
                    }}
                  />
                </div>
              </div>

              {/* Allergies */}
              <div className="p-2 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200 group">
                <div className="w-full flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-orange-50 transition-colors">
                      <Warning className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-gray-600 font-medium">
                      Allergies:
                    </span>
                  </div>
                  <Button variant="text" startIcon={<Edit />} color="warning">
                    Modify
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 ml-11">
                  <Chip
                    label="No known allergies"
                    size="small"
                    variant="outlined"
                    sx={{
                      color: "#6b7280",
                      borderColor: "#d1d5db",
                      fontSize: "12px",
                    }}
                  />
                  {/* Uncomment and use when allergies data is available
                  {patient.allergies?.map((allergy, index) => (
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

              {/* Chronic Conditions */}
              <div className="p-2 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-purple-50 transition-colors">
                    <LocalHospital className="w-4 h-4 text-purple-500" />
                  </div>
                  <span className="text-gray-600 font-medium">
                    Chronic Conditions:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 ml-11">
                  <Chip
                    label="None reported"
                    size="small"
                    variant="outlined"
                    sx={{
                      color: "#6b7280",
                      borderColor: "#d1d5db",
                      fontSize: "12px",
                    }}
                  />
                  {/* Uncomment and use when chronic conditions data is available
                  {patient.chronicConditions?.map((condition, index) => (
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
    </div>
  );
};

export default PatientInfo;
