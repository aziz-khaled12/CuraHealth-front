import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Box, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Appointment from "./Appointment";
import Facturation from "./Facturation";
import PatientInfo from "./PatientInfo";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import StepperForm from "./StepperForm";

const Office = () => {
  const navigate = useNavigate();
  
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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue, link) => {
    console.log(event);
    setValue(newValue);
  };

  const tabs = [
    {
      id: 0,
      title: "Appointment",
      component: <StepperForm />,
    },
    {
      id: 1,
      title: "Patient Info",
      component: <PatientInfo />,
    },
    {
      id: 2,
      title: "Facturation",
      component: <Facturation />,
    },
  ];

  useEffect(() => {
    console.log("value: ", value);
  });

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

      <div className="w-full bg-white min-h-[70vh] rounded-xl shadow-lg">
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
                return <TabPanel sx={{width: "100%"}} value={tab.id}>{tab.component}</TabPanel>;
              })}
            </div>
          </TabContext>
        </Box>
      </div>
    </>
  );
};

export default Office;
