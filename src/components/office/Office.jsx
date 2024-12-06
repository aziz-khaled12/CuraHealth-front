import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Box, Tab } from "@mui/material";
import Facturation from "./Facturation";
import PatientInfo from "./PatientInfo";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import StepperForm from "./StepperForm";

const Office = () => {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    bloodPressure: "",

    tension: "",
    pouls: "",
    frequenceRespiratoire: "",
    oxymetreDePouls: "",
    asthenie: "",
    anorexie: "",
    amaigrissement: "",
    diurese: "",

    physicalSigns: "",
    consultationCause: "",
    functionalSigns: "",
    diagnostic: "",
    conduits: "",
    files: [],
    ordonance: [],
  });

  const handleChange = (event, newValue, link) => {
    setValue(newValue);
  };



  const tabs = [
    {
      id: 0,
      title: "Patient Info",
      component: <PatientInfo />,
    },
    {
      id: 1,
      title: "Appointment",
      component: (
        <StepperForm
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      id: 2,
      title: "Facturation",
      component: <Facturation />,
    },
  ];

  return (
    <>
      <div className="mb-8">
        <Header
          title={"Doctor Office"}
          subTitle={
            "Manage Appointments, Patients, and Medical Records Efficiently"
          }
        />
      </div>

      <div className="w-full bg-white min-h-[68vh] rounded-xl shadow-lg">
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {tabs.map((tab, index) => {
                  return (
                    <Tab
                      key={index}
                      label={tab.title}
                      value={tab.id}
                      sx={{ textTransform: "none" }}
                    />
                  );
                })}
              </TabList>
            </Box>
            <div className="text-darkText text-lg font-medium flex">
              {tabs.map((tab, index) => {
                return (
                  <TabPanel sx={{ width: "100%" }} value={tab.id}>
                    {tab.component}
                  </TabPanel>
                );
              })}
            </div>
          </TabContext>
        </Box>
      </div>
    </>
  );
};

export default Office;
