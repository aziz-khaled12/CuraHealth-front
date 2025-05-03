import React, { useRef } from "react";
import { usePDF } from "react-to-pdf";
import MedicalRecordTemplate from "./pdf/MedicalRecordTemplate";
import { FaDownload, FaPrint } from "react-icons/fa";
import PageOne from "./pdf/PageOne";
import PageTwo from "./pdf/PageTwo";

const Test = () => {
  // Reference to the content we want to convert to PDF

  // Sample data
  const medicalRecord = {
    id: 0,
    doctor: "Dr. Khaled Aziz",
    type: "Consultation",
    startedAt: new Date("2025-03-10T14:30:00Z"),
    category: "General",
    status: "Completed",
    patientName: "Khaled Abd Elaziz",
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

  const clinicInfo = {
    name: "Cura Health Medical Center",
    address: "123 Healthcare Avenue, Medical District",
    contact: "Tel: (123) 456-7890 • Email: info@curahealth.com",
  };

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Function to handle PDF download
  const filename = `${medicalRecord.patientName
    .replace(/\s+/g, "-")
    .toLowerCase()}-medical-record-${
    new Date().toISOString().split("T")[0]
  }.pdf`;

  const { toPDF, targetRef } = usePDF({
    filename,
    page: { orientation: "portrait", size: "A4", margin: 15 },
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* PDF Controls */}
      <div className="w-full mx-auto mb-4 flex justify-end gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaPrint size={18} />
          <span>Print</span>
        </button>
        <button
          onClick={() => toPDF()}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          <FaDownload size={18} />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Content to be converted to PDF */}
      <div
        ref={targetRef}
        className="bg-white mx-auto"
        style={{
          width: "794px", // A4 width at 96 DPI
          minHeight: "1123px", // A4 height at 96 DPI
          boxSizing: "border-box",
        }}
      >
        <PageOne record={medicalRecord} clinic={clinicInfo} />
        <PageTwo record={medicalRecord} clinic={clinicInfo} />
      </div>
    </div>
  );
};

export default Test;
