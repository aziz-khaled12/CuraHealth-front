import React, { useEffect, useState } from "react";
import MedicalHistoryCard from "./MedicalHistoryCard";
import MedicalHistoryModal from "./MedicalHistoryModal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useHasPermission from "../../hooks/useHasPermission";
import { fetchPatientRecords } from "../../utils/services";

const MedicalHistory = ({ patient }) => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [patientRecords, setPatientRecords] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPatientRecords(patient.PatientID, setPatientRecords);
  }, [patient.PatientID]);

  useEffect(() => {
    console.log("patientRecords", patientRecords);
  }, [patientRecords]);

  const canSeeAllRecords = useHasPermission("see All Patient Records");
  console.log("canSeeAllRecords", canSeeAllRecords);

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
        {patientRecords && patientRecords.length > 0 ? (
          patientRecords
            .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
            .slice(0, 3)
            .map((session, index) => (
              <div className="w-full mb-4" key={index}>
                <MedicalHistoryCard
                  onSelectSession={setSelectedSession}
                  session={session}
                />
              </div>
            ))
        ) : (
          <div className="w-full flex p-12 items-center justify-center text-xl font-medium text-darkText">
            <div>No medical history found</div>
          </div>
        )}
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
