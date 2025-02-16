import React from "react";
import { Button, Chip } from "@mui/material";



const MedicalHistoryCard = ({session, onSelectSession }) => {
  return (
    <>
      <div className="w-full flex items-start justify-between shadow-behindShadow p-4 mb-2">
        <div>
          <p className="font-semibold text-lg mb-2">{session.startedAt}</p>
          <Chip label={session.category} />
          {/* <p className="text-sm mt-2">{session.details.consultationCause}</p> */}
        </div>
        <Button variant="contained" sx={{textTransform: "none"}} onClick={() => onSelectSession(session)}>View Details</Button>
      </div>
    </>
  );
};

export default MedicalHistoryCard;
