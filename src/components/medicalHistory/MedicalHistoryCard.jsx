import React from "react";
import { Paper, Chip, Button } from "@mui/material";
import {
  CalendarToday,
  AccessTime,
  Medication,
  Description,
  Assignment,
} from "@mui/icons-material";
import { format } from "date-fns";
import useHasPermission from "../../hooks/useHasPermission";

const MedicalHistoryCard = ({ session, onSelectSession }) => {
  const startTime = format(session.startedAt, "hh:mm a");
  const startDate = format(session.startedAt, "dd/MM/yyyy");
  const canSeeDetails = useHasPermission("see recent Patient Records details");

  return (
    <>
      <Paper className="rounded-lg border border-blue-100 overflow-hidden">
        <div className="bg-blue-50 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Assignment className="text-primary" />
            </div>
            <div>
              <div className="font-medium">{session.category} Consultation</div>
              <div className="flex items-center text-xs text-gray-500">
                <CalendarToday fontSize="small" className="mr-1" />
                {startDate}
                <AccessTime fontSize="small" className="ml-2 mr-1" />
                {startTime}
              </div>
            </div>
          </div>
          <Chip
            label={session.status}
            style={{
              backgroundColor:
                session.status === "Completed" ? "#EBF8FF" : "#FDE68A",
              color: session.status === "Completed" ? "#0369A1" : "#B45309",
              borderColor: "#BFDBFE",
            }}
            variant="outlined"
          />
        </div>
        <div className="p-4">
          <div className="mb-3">
            <div className="text-sm font-medium">
              Patient: {session.patientName}
            </div>
            <div className="text-sm font-medium">
              Diagnosis: {session.diagnosis.join(", ")}
            </div>
            <div className="text-sm font-medium">
              Consultation Cause: {session.consultationCause.join(", ")}
            </div>
          </div>

          <hr className="my-3 border-blue-100" />
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">Services</h4>
            <p className="text-sm">{session.services.join(", ")}</p>
          </div>
        </div>
        {canSeeDetails && (
          <div className="bg-blue-50 p-2 flex justify-end">
            <Button
              size="small"
              color="primary"
              onClick={() => onSelectSession(session)}
              startIcon={<Description />}
            >
              View Full session
            </Button>
          </div>
        )}
      </Paper>
    </>
  );
};

export default MedicalHistoryCard;
