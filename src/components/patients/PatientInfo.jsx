import { TextField } from "@mui/material";
import React from "react";
import { BiCalendar, BiUser } from "react-icons/bi";

const PatientInfo = ({ fakePatient }) => {
  const patientFields = [
    {
      label: "First Name",
      value: fakePatient.FirstName,
    },
    {
      label: "Last Name",
      value: fakePatient.LastName,
    },
    {
      label: "Patient ID",
      value: fakePatient.PatientID,
    },
    {
      label: "Birthday",
      value: fakePatient.BirthDay.toLocaleDateString(), // Formatting the date
    },
    {
      label: "Address",
      value: fakePatient.Address,
    },
    {
      label: "Email",
      value: fakePatient.Email,
    },
    {
      label: "Phone Number",
      value: fakePatient.PhoneNum,
    },
    {
      label: "Etat Civil",
      value: fakePatient.etatCivil,
    },
    {
      label: "Blood Type",
      value: fakePatient.bloodtype,
    },
    {
      label: "National Id Number",
      value: fakePatient.nationalId,
    },
    {
      label: "Sex",
      value: fakePatient.Sex === 1 ? "Male" : "Female", // Assuming 1 is Male, 0 is Female
    },
  ];

  return (
    <div className="w-[78%] min-h-[60vh] bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full min-h-[60vh] md:w-[30%] border-b md:border-b-0 md:border-r border-lightText flex items-center justify-center p-6">
          <div className="flex flex-col items-center w-full max-w-xs">
            <div className="w-32 h-32 rounded-full bg-primary mb-5 flex items-center justify-center">
              <BiUser size={64} className="text-primaryText" />
            </div>

            <div className="text-center mb-8">
              <h2 className="font-bold text-gray-800 text-2xl mb-1">
                {fakePatient.FirstName} {fakePatient.LastName}
              </h2>
              <p className="font-semibold text-gray-600 text-base">
                {fakePatient.Email}
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
                    {fakePatient.previous}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Previous
                  </div>
                </div>
                <div className="w-1/2 pl-4">
                  <div className="text-darkText text-3xl font-bold mb-1">
                    {fakePatient.coming}
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
        <div className="w-full md:w-[70%] p-6 flex flex-wrap gap-5">
          {patientFields.map((field, index) => {
            return (
              <TextField
                key={index}
                sx={{ fontSize: "16px", width: "47%" }}
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
  );
};

export default PatientInfo;
