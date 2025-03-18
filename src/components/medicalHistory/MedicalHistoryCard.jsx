import React from "react";
import { Paper, Chip, Button } from "@mui/material";
import { CalendarToday, AccessTime, Medication, Description, Assignment } from "@mui/icons-material";
import { format } from "date-fns";

const MedicalHistoryCard = ({ session, onSelectSession }) => {
  const startTime = format(session.startedAt, "hh:mm a");
  const startDate = format(session.startedAt, "dd/MM/yyyy");
  
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
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-xs font-medium text-gray-500 mb-2">Vitals</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {session.vitals.map((vital, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-500">{vital.name}:</span>
                    <span>{vital.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500 mb-2">
                Medications
              </h4>
              <div className="space-y-1">
                {session.medicaments.map((medication, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Medication
                      fontSize="small"
                      className="mr-1 text-primary"
                    />
                    <span>
                      {medication.name} ({medication.dosage})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="my-3 border-blue-100" />
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">
              Physical Signs
            </h4>
            <p className="text-sm">{session.physicalSigns.join(", ")}</p>
          </div>
          <hr className="my-3 border-blue-100" />
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">
              Functional Signs
            </h4>
            <p className="text-sm">{session.functionalSigns.join(", ")}</p>
          </div>
          <hr className="my-3 border-blue-100" />
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">Services</h4>
            <p className="text-sm">{session.services.join(", ")}</p>
          </div>
        </div>
        <div className="bg-blue-50 p-2 flex justify-end">
          <Button size="small" color="primary" onClick={() => onSelectSession(session)} startIcon={<Description />}>
            View Full session
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default MedicalHistoryCard;
