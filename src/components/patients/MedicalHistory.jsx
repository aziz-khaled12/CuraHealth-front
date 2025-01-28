import React, { useState } from "react";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from "@mui/lab";
import MedicalHistoryCard from "./MedicalHistoryCard";
import MedicalHistoryModal from "./MedicalHistoryModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const medicalHistoryData = [
  {
    id: 1,
    date: "2023-06-15",
    type: "Regular Checkup",
    doctor: "Dr. Smith",
    summary: "Annual physical examination",
    details: {
      generalSigns: [
        { name: "Blood Pressure", value: "120/80 mmHg" },
        { name: "Heart Rate", value: "72 bpm" },
        { name: "Temperature", value: "98.6°F" },
        { name: "Weight", value: "70 kg" },
        { name: "Height", value: "175 cm" },
        { name: "BMI", value: "22.9" },
      ],
      notes:
        "Patient is in good health. Recommended to maintain current diet and exercise routine.",
      prescriptions: [
        {
          name: "Vitamin D",
          dosage: "1000 IU",
          instructions: "Take once daily with food",
        },
      ],
      services: ["Blood Test", "Chest X-ray"],
      documents: [
        { name: "Blood Test Results", type: "PDF" },
        { name: "Chest X-ray Image", type: "DICOM" },
      ],
    },
  },
  {
    id: 2,
    date: "2023-09-03",
    type: "Emergency Visit",
    doctor: "Dr. Johnson",
    summary: "Severe allergic reaction",
    details: {
      generalSigns: [
        { name: "Blood Pressure", value: "140/90 mmHg" },
        { name: "Heart Rate", value: "110 bpm" },
        { name: "Temperature", value: "99.5°F" },
        { name: "Respiratory Rate", value: "22 breaths/min" },
        { name: "Oxygen Saturation", value: "94%" },
      ],
      notes:
        "Patient experienced anaphylaxis after accidental peanut exposure. Treated with epinephrine and antihistamines.",
      prescriptions: [
        {
          name: "EpiPen",
          dosage: "0.3 mg",
          instructions: "Use as needed for severe allergic reactions",
        },
        {
          name: "Cetirizine",
          dosage: "10 mg",
          instructions: "Take once daily for allergy symptoms",
        },
      ],
      services: ["Allergy Test"],
      documents: [
        { name: "Allergy Test Results", type: "PDF" },
        { name: "Emergency Room Report", type: "PDF" },
      ],
    },
  },
  {
    id: 3,
    date: "2024-01-10",
    type: "Follow-up",
    doctor: "Dr. Smith",
    summary: "Asthma management review",
    details: {
      generalSigns: [
        { name: "Blood Pressure", value: "118/78 mmHg" },
        { name: "Heart Rate", value: "68 bpm" },
        { name: "Temperature", value: "98.4°F" },
        { name: "Peak Flow", value: "450 L/min" },
        { name: "FEV1", value: "3.2 L" },
        { name: "FVC", value: "4.0 L" },
      ],
      notes: "Asthma is well-controlled. Adjusted medication dosage.",
      prescriptions: [
        {
          name: "Albuterol Inhaler",
          dosage: "90 mcg",
          instructions: "Use as needed for shortness of breath",
        },
        {
          name: "Fluticasone Inhaler",
          dosage: "250 mcg",
          instructions: "Use twice daily",
        },
      ],
      services: ["Spirometry Test"],
      documents: [
        { name: "Spirometry Test Results", type: "PDF" },
        { name: "Asthma Action Plan", type: "PDF" },
      ],
    },
  },
];
const MedicalHistory = ({patient}) => {
  const patientId = useParams();
  const [selectedSession, setSelectedSession] = useState(null);


  console.log("patient", patient);
  return (
    <>
      <h2 className="text-2xl font-bold text-darkText">Medical History</h2>
      <div className="w-full">
        {patient && patient.sessions && patient.sessions.length > 0 ? (
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {patient.sessions.map((session, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <MedicalHistoryCard
                    onSelectSession={setSelectedSession}
                    session={session}
                  />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <div className="w-full h-[30vh] flex items-center justify-center text-xl font-medium text-darkText">
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
