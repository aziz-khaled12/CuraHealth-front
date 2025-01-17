import React, { useEffect, useState } from "react";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { GrDocumentText } from "react-icons/gr";
import ViewerModal from "../ViewerModal";
import { FaPlus } from "react-icons/fa";
import ModifySignsModal from "./ModifySignsModal";
import { LuPencil } from "react-icons/lu";
import { useSelector } from "react-redux";
const GeneralSignsForm = ({ formData, setFormData }) => {
  
  useEffect(() => {
    console.log("formData: ", formData);
  }, [formData]);
  const [open, setOpen] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const { signs } = useSelector((state) => state.signs);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  useEffect(() => {
    console.log("signs: ", signs)
  }, [signs])

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

  const handleOpenModify = () => {
    setOpenModify(true);
  };

  const handleCloseModify = () => {
    setOpenModify(false);
  };

  useEffect(() => {
    console.log(openModify);
  }, [openModify]);

  return (
    <>
      <Stack direction={"row"} gap={4} mb={4}>
        <div className="w-1/2 p-8 border-2 border-lightText/20 border-solid rounded-lg">
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ mb: 4 }}
          >
            <div className="text-2xl font-semibold text-darkText">
              General Signs
            </div>

            <Button
              variant="contained"
              startIcon={<LuPencil className="!text-lg"/>}
              onClick={handleOpenModify}
              sx={{textTransform: "none"}}
            >
              Modify Signs
            </Button>
          </Stack>

          <Stack direction={"column"} gap={2} height={"100%"} mb={4}>
            {signs.map((sign, index) => {
              return (
                <Stack gap={1} key={index}>
                  <div className="text-sm font-medium text-darkText">
                    {sign.name}
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
                    type={sign.type}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">{sign.unit}</InputAdornment>
                        ),
                      },
                    }}
                    fullWidth
                  />
                </Stack>
              );
            })}
          </Stack>
        </div>

        <div className="w-1/2 p-8 border-2 border-lightText/20 border-solid rounded-lg">
          <div className="text-2xl font-semibold p-0 text-darkText mb-8">
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
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        height: "1rem",
                      },
                    }}
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

      {openModify && (
        <ModifySignsModal open={openModify} handleClose={handleCloseModify} />
      )}

      {open && (
        <ViewerModal open={open} file={selectedFile} onClose={handleClose} />
      )}
    </>
  );
};

export default GeneralSignsForm;