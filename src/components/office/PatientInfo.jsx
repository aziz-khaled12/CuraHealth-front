import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { BiCalendar, BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";

const PatientInfo = ({ patientId }) => {
  console.log("id", patientId)

  const selectedPatient = useSelector(
    (state) => state.patients.patients[patientId - 1]
  );

  useEffect(() => {
    console.log("patient: ", selectedPatient)
  }, [selectedPatient])

  const patientFields = [
    {
      label: "First Name",
      value: selectedPatient.firstName,
    },
    {
      label: "Last Name",
      value: selectedPatient.lastName,
    },
    {
      label: "Patient ID",
      value: selectedPatient.id,
    },
    {
      label: "Birthday",
      value: selectedPatient.birthday, // Formatting the date
    },
    {
      label: "Address",
      value: selectedPatient.address,
    },
    {
      label: "Email",
      value: selectedPatient.email,
    },
    {
      label: "Phone Number",
      value: selectedPatient.phoneNumber,
    },
    {
      label: "Etat Civil",
      value: selectedPatient.etatCivil,
    },
    {
      label: "Blood Type",
      value: selectedPatient.bloodtype,
    },
    {
      label: "National Id Number",
      value: selectedPatient.nationalId,
    },
    {
      label: "Sex",
      value: selectedPatient.Sex === 1 ? "Male" : "Female", // Assuming 1 is Male, 0 is Female
    },
  ];

  return (
    <>
      <div className="w-full bg-white rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full  md:w-[25%] border-b md:border-b-0 md:border-r border-lightText flex items-center justify-center p-6">
            <div className="flex flex-col items-center w-full max-w-xs">
              <div className="w-32 h-32 rounded-full bg-primary mb-5 flex items-center justify-center">
                <BiUser size={64} className="text-primaryText" />
              </div>

              <div className="text-center mb-8">
                <h2 className="font-bold text-gray-800 text-2xl mb-1">
                  {selectedPatient.fullName} 
                </h2>
                <p className="font-semibold text-gray-600 text-base">
                  {selectedPatient.email}
                </p>
              </div>

              <div className="w-full">
                <h3 className="text-xl font-bold text-darkText mb-4 flex items-center justify-center">
                  <BiCalendar className="mr-2" size={20} />
                  Appointments
                </h3>
                <div className="flex items-center justify-between text-center">
                  <div className="w-1/2 border-r border-gray-200 pr-4">
                    <div className="text-darkText text-3xl font-bold mb-1">
                      {selectedPatient.previous}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      Previous
                    </div>
                  </div>
                  <div className="w-1/2 pl-4">
                    <div className="text-darkText text-3xl font-bold mb-1">
                      {selectedPatient.coming}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      Upcoming
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right side content can be added here */}
          <div className="w-full md:w-[75%] content-start p-6 flex flex-wrap gap-5">
            {patientFields.map((field, index) => {
              return (
                <TextField
                  key={index}
                  sx={{ fontSize: "16px", width: "30%" }}
                  variant="filled"
                  label={field.label}
                  value={field.value}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientInfo;
