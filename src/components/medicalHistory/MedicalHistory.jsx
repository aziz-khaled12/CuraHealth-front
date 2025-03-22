import React, { useState } from "react";
import MedicalHistoryCard from "./MedicalHistoryCard";
import MedicalHistoryModal from "./MedicalHistoryModal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useHasPermission from "../../hooks/useHasPermission";

const MedicalHistory = ({ patient }) => {
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();
  const fakeSession = {
    startedAt: new Date("2025-03-10T14:30:00Z"),
    category: "General",
    status: "Completed",
    patientName: `${patient.FirstName} ${patient.LastName}`,
    diagnosis: ["Hypertension", "Type 2 Diabetes"],
    consultationCause: ["Headache", "Fatigue"],
    vitals: [
      { name: "Blood Pressure", value: "130/85 mmHg" },
      { name: "Heart Rate", value: "78 bpm" },
      { name: "Temperature", value: "98.6°F" },
      { name: "Respiratory Rate", value: "16 breaths/min" },
    ],
    medicaments: [
      { name: "Metformin", dosage: "500mg" },
      { name: "Lisinopril", dosage: "10mg" },
    ],
    physicalSigns: ["Pale skin", "Slightly elevated BP"],
    functionalSigns: ["Mild dizziness", "Occasional shortness of breath"],
    services: ["Blood Test", "ECG", "Prescription Refill"],
    files: [],
  };

  const canSeeAllRecords = useHasPermission("see All Patient Records");
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-darkText">
          Medical History
        </h2>
        {canSeeAllRecords && (
           <Button
           variant="outlined"
           sx={{ textTransform: "none" }}
           onClick={() => navigate(`/patients/${patient.PatientID}/records`)}
         >
           See All Records
         </Button>
        )}
       
      </div>
      <div className="w-full mt-4">


        {/* {patient && patient.sessions && patient.sessions.length > 0 ? (
          patient.sessions.map((session, index) => (
            <MedicalHistoryCard
              key={index}
              onSelectSession={setSelectedSession}
              session={session}
            />
          ))
        ) : (
          <div className="w-full flex p-12 items-center justify-center text-xl font-medium text-darkText">
            <div>No medical history found</div>
          </div>
        )} */}

        <MedicalHistoryCard
          onSelectSession={setSelectedSession}
          session={fakeSession}
        />


      </div>
      {selectedSession && (
        <MedicalHistoryModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </>
  );
};

export default MedicalHistory;
