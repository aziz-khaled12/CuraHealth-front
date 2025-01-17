import { Button } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import ViewerModal from "../ViewerModal";

const Documents = () => {
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
  return (
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
      {open && (
        <ViewerModal open={open} file={selectedFile} onClose={handleClose} />
      )}
    </div>
  );
};

export default Documents;
