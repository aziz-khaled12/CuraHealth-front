import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import ViewerModal from "./ViewerModal";
import { useDispatch, useSelector } from "react-redux";
import { updateSessionAttribute } from "../../redux/sessionSlice";

const TestDocs = ({sessionId}) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  
  // Get files for the current session from Redux store
  const sessionFiles = useSelector(state => 
    state.sessions.files.find(f => f.sessionId === sessionId)?.data || []
  );

  // File upload handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const fileInfo = {
        id: Date.now().toString(), // Generate unique ID
        title: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        binary: file, // File object
        url: URL.createObjectURL(file), // Temporary URL for display
        uploadDate: new Date().toISOString(),
      };
      
      // Update Redux store with the new file
      const updatedFiles = [...sessionFiles, fileInfo];
      dispatch(updateSessionAttribute({
        sessionId,
        category: 'files',
        newData: updatedFiles
      }));
    }
  };

  const handleFileSelect = (fileUrl) => {
    setSelectedFile(fileUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  useEffect(() => {
    console.log("Session Files:", sessionFiles);
  }, [sessionFiles]);


  return (
    <div className="w-full h-full bg-white p-4 border-2 border-lightText/20 border-solid rounded-lg">
      <div className="text-xl font-semibold text-darkText mb-6">
        Imported Documents
      </div>

      <div
        className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${
          sessionFiles.length === 0 ? "block" : "hidden"
        }`}
      >
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop your files here or click to select them
        </p>
        <label htmlFor="file-upload">
          <Button
            component="span"
            variant="outlined"
            sx={{ textTransform: "none", color: "black" }}
          >
            ➕ Import a document
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
          sessionFiles.length === 0 ? "hidden" : "flex"
        } flex-wrap w-full h-full`}
      >
        {sessionFiles.map((file, index) => (
          <div className="p-2 w-1/6" key={index}>
            <Stack
              className="rounded-lg border-2 border-lightText/20 border-solid shadow-md cursor-pointer hover:bg-black/5 transition-all duration-300"
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
            className="rounded-lg cursor-pointer h-full min-h-[8rem] border-2 border-lightText border-dashed shadow-md flex items-center justify-center hover:bg-black/5 transition-all duration-300"
          >
            <FaPlus className="text-2xl" />
          </label>
        </div>
      </div>
      {open && (
        <ViewerModal open={open} file={selectedFile} onClose={handleClose} />
      )}
    </div>
  );
};

export default TestDocs;
