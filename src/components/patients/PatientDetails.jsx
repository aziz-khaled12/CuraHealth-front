import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { BiCalendar, BiUser } from "react-icons/bi";
import { Button, TextField } from "@mui/material";
import { AiOutlineFileAdd } from "react-icons/ai";
import ViewerModal from "../ViewerModal";
import test from "../../assets/files/test.pdf";
import { GrDocumentText } from "react-icons/gr";

const url = import.meta.env.VITE_BACK_END_URL;
const token = localStorage.getItem("token");

const PatientDetails = () => {
  
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // File upload handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const fileInfo = {
        title: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        url: URL.createObjectURL(file), // Temporary URL for display
      };
      setFiles([...files, fileInfo]); // Add the file info to the array
    }
  };

  const handleFileSelect = (fileUrl) => {
    setSelectedFile(fileUrl); // Store the selected file's URL
    setOpen(true);
    console.log("Selected file URL:", selectedFile);
    // You can now do something with the selected file URL
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };


  const fakePatient = {
    PatientID: "1",
    FirstName: "Khaled",
    LastName: "Abd Elaziz",
    BirthDay: new Date(2005, 4, 10),
    Address: "123 Elm Street, Springfield, IL",
    Email: "khaledaziz@yahoo.com",
    PhoneNum: "0561036105",
    etatCivil: "Single",
    bloodtype: "O+",
    nationalId: "986451398465",
    Sex: 1,
    previous: 5,
    coming: 1,
  };

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

  const showPdf = () => {
    setOpen(true);
  };

  useEffect(() => {
    try {
      const res = axios.get(`${url}/api/patient`, {
        params: { PatientID: id },
        headers: { Authorization: `${token}` },
      });
      console.log(res);
      setPatient(res.data.patient[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      <div>
          <Header
            title={"Patients"}
            subTitle={`${fakePatient.FirstName} ${fakePatient.LastName}`}
          />

        <div className="flex w-full gap-4">
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
          <div className="w-[22%] min-h-[60vh] bg-white rounded-xl shadow-lg p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="text-darkText font-semibold text-base">
                Files/Documents
              </div>
              <label
                htmlFor="file-upload"
                className="flex items-center text-lg text-primary hover:text-gray-600 transition-all duration-300 font-semibold cursor-pointer"
              >
                <AiOutlineFileAdd className="mr-1" />{" "}
                <span className="text-sm font-semibold">Add files</span>
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf" // Only allow PDF files
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              {files.map((file, index) => (
                <Button
                  key={index}
                  variant="filled"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: ".5rem",
                    padding: "12px",
                    textTransform: "none",
                  }}
                  className="w-full shadow-behindShadow p-3"
                  onClick={() => {
                    handleFileSelect(file.url);
                  }}
                >
                  <div className="flex items-center">
                    <GrDocumentText className="mr-2" />
                    {file.title}
                  </div>
                  <div>{file.size}</div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div></div>
      </div>

      {open && (
        <ViewerModal
          open={open}
          file={selectedFile}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default PatientDetails;
