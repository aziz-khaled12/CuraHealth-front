import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { AiOutlineFileAdd } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import ViewerModal from "../ViewerModal";
import { FaPlus } from "react-icons/fa";
const GeneralSignsForm = ({ formData, setFormData }) => {
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const generalSignes = [
    {
      name: "height",
      placeholder: "Height",
    },
    {
      name: "weight",
      placeholder: "Weight",
    },
    {
      name: "bloodPressure",
      placeholder: "Blood Pressure",
    },
  ];

  const otherSignes = [
    {
      name: "consultationCause",
      placeholder: "Consultation Cause",
    },
    {
      name: "physicalSigns",
      placeholder: "Physical Signs",
    },
    {
      name: "functionalSigns",
      placeholder: "Functional Signs",
    },

    {
      name: "diagnostic",
      placeholder: "Diagnostic",
    },
    {
      name: "conduits",
      placeholder: "Conduits a tenir",
    },
  ];

  const [selectedFile, setSelectedFile] = useState(null);

  // File upload handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const fileInfo = {
        title: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        url: URL.createObjectURL(file), // Temporary URL for display
        file: file,
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        files: [...(prevFormData.files || []), fileInfo], 
      }));
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

  return (
    <>
      <Stack direction={"row"} gap={4} mb={4}>
        <div className="w-1/2 p-8 border-2 border-lightText/20 border-solid rounded-lg">
          <div className="text-2xl font-semibold text-darkText mb-6">
            General Signs
          </div>
          <Stack direction={"column"} gap={2} height={"100%"} mb={4}>
            {generalSignes.map((sign, index) => {
              return (
                <Stack gap={1} key={index}>
                  <div className="text-sm font-medium text-darkText">
                    {sign.placeholder}
                  </div>
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        height: "1rem",
                      },
                    }}
                    placeholder={sign.placeholder}
                    value={formData[sign.name]}
                    name={sign.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </Stack>
              );
            })}
          </Stack>
        </div>

        <div className="w-1/2 p-8 border-2 border-lightText/20 border-solid rounded-lg">
          <div className="text-2xl font-semibold p-0 text-darkText mb-6">
            Other Information
          </div>

          <Stack direction={"column"} gap={2}>
            {otherSignes.map((sign, index) => {
              return (
                <Stack gap={1} key={index}>
                  <div className="text-sm font-medium text-darkText">
                    {sign.placeholder}
                  </div>
                  <TextField
                    placeholder={sign.placeholder}
                    value={formData[sign.name]}
                    name={sign.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </Stack>
              );
            })}
          </Stack>
        </div>
      </Stack>
      <div className="w-full h-full px-8 py-4 border-2 border-lightText/20 border-solid rounded-lg">
        <div className="text-2xl font-semibold text-darkText mb-6">
          Documents importés
        </div>

        <div
          className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${
            formData.files.length === 0 ? "block" : "hidden"
          }`}
        >
          <p className="text-sm text-gray-500 mb-4">
            Glissez-déposez vos fichiers ici ou cliquez pour les sélectionner
          </p>
          <label htmlFor="file-upload">
            <Button
              component="span"
              variant="outlined"
              sx={{ textTransform: "none", color: "black" }}
            >
              ➕ Importer un document
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        <div
          className={`${
            formData.files.length === 0 ? "hidden" : "flex"
          } flex-wrap w-full h-full `}
        >
          {formData.files.map((file, index) => {
            return (
              <div className="p-2 w-1/6">
                <Stack
                  key={index}
                  className="rounded-lg border-2 border-lightText/20 border-solid shadow-md"
                  direction={"column"}
                  alignItems={"center"}
                  p={4}
                  gap={2}
                  onClick={() => {
                    handleFileSelect(file.url);
                  }}
                >
                  <GrDocumentText className="mr-2 text-2xl " />
                  <div>{file.title}</div>
                </Stack>
              </div>
            );
          })}
          <div className="w-1/6 p-2">
          <label
            htmlFor="file-upload"
            className="rounded-lg h-full min-h-[8rem] border-2 border-lightText border-dashed shadow-md flex items-center justify-center"
          >
            <FaPlus className="text-2xl" />
          </label>
          </div>
        </div>
      </div>

      {open && (
        <ViewerModal open={open} file={selectedFile} onClose={handleClose} />
      )}
    </>
  );
};

export default GeneralSignsForm;
