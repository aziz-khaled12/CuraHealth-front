import React, { useEffect, useState } from "react";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { GrDocumentText } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { useSelector } from "react-redux";
import ViewerModal from "../ViewerModal";
import ModifySignsModal from "./ModifySignsModal";
import { mdiConsoleLine } from "@mdi/js";

const GeneralSignsForm = ({ formData, setFormData }) => {
  const [open, setOpen] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Ensure signs is not undefined from Redux store
  const { generalSigns, otherSigns, generalInfo } = useSelector(
    (state) => state.signs
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
  };

  const handleGeneralSignsChange = (event) => {
    const { name, value } = event.target;

    const updatedData = {
      ...formData,
      generalSigns: formData.generalSigns.map((sign) =>
        sign.name === name ? { ...sign, value } : sign
      ),
    };

    setFormData(updatedData);
  };

  const handleOtherSignsChange = (event) => {
    const { name, value } = event.target;
    const updatedData = {
      ...formData,
      otherSigns: formData.otherSigns.map((sign) =>
        sign.name === name ? { ...sign, value } : sign
      ),
    };
    setFormData(updatedData);
  };

  useEffect(() => {
    console.log("form data: ", formData);
  }, [formData]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileInfo = {
      title: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      url: URL.createObjectURL(file),
      file: file,
    };

    console.log("fileInfo: ", fileInfo);

    const updatedData = {
      ...formData,
      ["files"]: [...(formData.files || []), fileInfo], // Append the new file to the files array (or create a new array if it doesn't exist)
    };

    console.log("updatedData: ", updatedData);

    setFormData(updatedData);
  };

  const handleFileSelect = (fileUrl) => {
    setSelectedFile(fileUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  const handleOpenModify = () => setOpenModify(true);
  const handleCloseModify = () => setOpenModify(false);

  // Ensure formData.files exists
  const files = formData?.files || [];

  return (
    <>
      <Stack direction="row" gap={4} mb={4}>
        <div className="w-1/2 p-8 border-2 border-lightText/20 border-solid rounded-lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 4 }}
          >
            <div className="text-2xl font-semibold text-darkText">
              General Signs
            </div>
            <Button
              variant="contained"
              startIcon={<LuPencil className="!text-lg" />}
              onClick={handleOpenModify}
              sx={{ textTransform: "none" }}
            >
              Modify Signs
            </Button>
          </Stack>

          <Stack direction="column" gap={2} height="100%" mb={4}>
            {generalSigns.map((sign, index) => {
              // Find the matching value in formData.generalSigns based on the name
              const matchingSign = formData.generalSigns.find(
                (item) => item.name === sign.name
              );

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
                    value={matchingSign?.value || ""} // Use the matching sign's value, or fallback to ""
                    name={sign.name}
                    onChange={handleGeneralSignsChange}
                    type={sign.type || "text"}
                    InputProps={{
                      endAdornment: sign.unit && (
                        <InputAdornment position="end">
                          {sign.unit}
                        </InputAdornment>
                      ),
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
          <Stack direction="column" gap={2}>
            {otherSigns.map((sign, index) => {
              const matchingSign = formData.otherSigns.find(
                (item) => item.name === sign.name
              );
              return (
                <Stack gap={1} key={index}>
                  <div className="text-sm font-medium text-darkText">
                    {sign.placeholder}
                  </div>
                  <TextField
                    placeholder={sign.placeholder}
                    value={matchingSign?.value || ""} 
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        height: "1rem",
                      },
                    }}
                    name={sign.name}
                    onChange={handleOtherSignsChange}
                    fullWidth
                  />
                </Stack>
              );
            })}
            {generalInfo.map((sign, index) => (
              <Stack gap={1} key={index}>
                <div className="text-sm font-medium text-darkText">
                  {sign.placeholder}
                </div>
                <TextField
                  placeholder={sign.placeholder}
                  value={formData?.[sign.name] || ""}
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
            ))}
          </Stack>
        </div>
      </Stack>

      <div className="w-full h-full px-8 py-4 border-2 border-lightText/20 border-solid rounded-lg">
        <div className="text-2xl font-semibold text-darkText mb-6">
          Documents importés
        </div>

        <div
          className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${
            files.length === 0 ? "block" : "hidden"
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
            files.length === 0 ? "hidden" : "flex"
          } flex-wrap w-full h-full`}
        >
          {files.map((file, index) => (
            <div className="p-2 w-1/6" key={index}>
              <Stack
                className="rounded-lg border-2 border-lightText/20 border-solid shadow-md"
                direction="column"
                alignItems="center"
                p={4}
                gap={2}
                onClick={() => handleFileSelect(file.url)}
              >
                <GrDocumentText className="mr-2 text-2xl" />
                <div>{file.title}</div>
              </Stack>
            </div>
          ))}
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
        <ModifySignsModal
          open={openModify}
          handleClose={handleCloseModify}
          setFormData={setFormData}
          formData={formData}
        />
      )}

      {open && (
        <ViewerModal open={open} file={selectedFile} onClose={handleClose} />
      )}
    </>
  );
};

export default GeneralSignsForm;
