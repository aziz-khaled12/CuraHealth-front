import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientInfo from "./PatientInfo";
import Documents from "./Documents";
import { useSelector } from "react-redux";
import MedicalHistory from "../../medicalHistory/MedicalHistory";
import useHasPermission from "../../../hooks/useHasPermission";


const PatientDetails = () => {
  const { id } = useParams();
  const patient = useSelector((state) =>
    state.patients.patients.find((patient) => patient.PatientID == id)
  );
  const canSeeRecentRecords = useHasPermission("see recent Patient Records");
  return (
    patient && (
      <>
        <div>

          <div className="flex w-full gap-4">
            <PatientInfo patient={patient} />
            <Documents></Documents>
          </div>
          {canSeeRecentRecords && (
            <div className="my-4 bg-white rounded-xl shadow-md border border-[#B4B4B4] py-8 px-6">
              <MedicalHistory patient={patient}></MedicalHistory>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default PatientDetails;
