import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import MedicalHistory from "./MedicalHistory";
import PatientInfo from "./PatientInfo";
import Documents from "./Documents";

const url = import.meta.env.VITE_BACK_END_URL;
const token = localStorage.getItem("token");

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({});

  const fakePatient = {
    PatientID: "1",
    FirstName: "Khaled",
    LastName: "Abd Elaziz",
    BirthDay: new Date(2005, 4, 10),
    Address: "123 Elm Street, Springfield, IL",
    Email: "khaledaziz@yahoo.com",
    PhoneNum: "0561036105",
    etatCivil: "Single",
    bloodtype: "O+",
    nationalId: "986451398465",
    Sex: 1,
    previous: 5,
    coming: 1,
  };

  useEffect(() => {
    try {
      const res = axios.get(`${url}/api/patient`, {
        params: { PatientID: id },
        headers: { Authorization: `${token}` },
      });
      console.log(res);
      setPatient(res.data.patient[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <>
      <div>
        <Header
          title={"Patients"}
          subTitle={`${fakePatient.FirstName} ${fakePatient.LastName}`}
        />

        <div className="flex w-full gap-4">
          <PatientInfo fakePatient={fakePatient}></PatientInfo>
          <Documents></Documents>
        </div>


        <div className="my-4 bg-white rounded-xl shadow-lg p-5">
          <MedicalHistory></MedicalHistory>
        </div>
      </div>
    </>
  );
};

export default PatientDetails;
