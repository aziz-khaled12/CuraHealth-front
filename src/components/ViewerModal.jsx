import { Box, Modal } from "@mui/material";
import React from "react";
import FileViewer from "react-file-viewer";

const ViewerModal = ({ open, file, onClose }) => {
 
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          maxHeight: "95vh",
          width: 900,
        }}
      >
 
          <iframe src={file} className="h-[90vh]" height="90vh" width={900}></iframe>
   
      </Box>
    </Modal>
  );
};

export default ViewerModal;
