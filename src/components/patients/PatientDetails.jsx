import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import MedicalHistory from "./MedicalHistory";
import PatientInfo from "./PatientInfo";
import Documents from "./Documents";
import { useSelector } from "react-redux";

const url = import.meta.env.VITE_BACK_END_URL;
const token = localStorage.getItem("token");

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({});

  const fakePatient = useSelector((state) => state.patients.patients[id - 1]);

  useEffect(() => {
    console.log("fakePatient", fakePatient)
  }, [fakePatient])


  // useEffect(() => {
  //   try {
  //     const res = axios.get(`${url}/api/patient`, {
  //       params: { PatientID: id },
  //       headers: { Authorization: `${token}` },
  //     });
  //     console.log(res);
  //     setPatient(res.data.patient[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    fakePatient && (
      <>
        <div>
          <Header
            title={"Patients"}
            subTitle={`${fakePatient.firstName} ${fakePatient.lastName}`}
          />
          <div className="flex w-full gap-4">
            <PatientInfo fakePatient={fakePatient} />
            <Documents></Documents>
          </div>
          <div className="my-4 bg-white rounded-xl shadow-lg p-5">
            <MedicalHistory patient={fakePatient}></MedicalHistory>
          </div>
        </div>
      </>
    )
  );
};

export default PatientDetails;
