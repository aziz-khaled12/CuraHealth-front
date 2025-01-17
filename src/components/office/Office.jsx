import React, { useState } from "react";
import Header from "../Header";
import { Box, Button, Stack, Tab, Drawer } from "@mui/material";
import Facturation from "./Facturation";
import PatientInfo from "./PatientInfo";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import StepperForm from "./StepperForm";
import { IoMdClose } from "react-icons/io";

const SessionTabs = ({ session, onClose }) => {
  const [innerTabValue, setInnerTabValue] = useState(0);

  const handleInnerTabChange = (event, newValue) => {
    setInnerTabValue(newValue);
  };

  const innerTabs = [
    {
      id: 0,
      title: "Patient Info",
      component: <PatientInfo />,
    },
    {
      id: 1,
      title: "Appointment",
      component: <StepperForm formData={session.formData} setFormData={session.setFormData} />,
    },
    {
      id: 2,
      title: "Facturation",
      component: <Facturation />,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-50">
        <div>
          <h2 className="text-xl font-semibold">{session.patientName}</h2>
          <p className="text-gray-600">Started: {session.timestamp}</p>
        </div>
        <Button
          variant="outlined"
          onClick={onClose}
          startIcon={<IoMdClose size={16} />}
        >
          Close Session
        </Button>
      </div>

      <Box sx={{ width: "100%" }}>
        <TabContext value={innerTabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleInnerTabChange}>
              {innerTabs.map((tab) => (
                <Tab
                  key={tab.id}
                  label={tab.title}
                  value={tab.id}
                  sx={{ textTransform: "none" }}
                />
              ))}
            </TabList>
          </Box>
          {innerTabs.map((tab) => (
            <TabPanel key={tab.id} value={tab.id}>
              {tab.component}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </div>
  );
};

const Office = () => {
  const [outerTabValue, setOuterTabValue] = useState("main");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSessions, setActiveSessions] = useState([]);
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

  const handleOuterTabChange = (event, newValue) => {
    setOuterTabValue(newValue);
  };







  

  // Problem in set form data

  const startSession = (patientData) => {
    const sessionId = Date.now().toString();
    const newSession = {
      id: sessionId,
      patientName: patientData.name,
      formData: { ...formData },
      setFormData: (newData) => {
        setActiveSessions(prevSessions => 
          prevSessions.map(s => 
            s.id === sessionId ? { ...s, formData: newData } : s
          )
        );
      },
      timestamp: new Date().toLocaleString(),
    };
    setActiveSessions([...activeSessions, newSession]);
    setOuterTabValue(sessionId);
    setDrawerOpen(false);
  };











  const closeSession = (sessionId) => {
    setActiveSessions(activeSessions.filter(session => session.id !== sessionId));
    setOuterTabValue(activeSessions.length > 1 ? activeSessions[0].id : "main");
  };

  return (
    <>
      <div className="mb-8">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Header
            title="Doctor Office"
            subTitle="Manage Appointments, Patients, and Medical Records Efficiently"
          />
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => setDrawerOpen(true)}
          >
            See All Appointments
          </Button>
        </Stack>
      </div>

      <div className="w-full bg-white min-h-[68vh] rounded-xl shadow-lg">
        <TabContext value={outerTabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleOuterTabChange}>
              <Tab
                label="Main Dashboard"
                value="main"
                sx={{ textTransform: "none" }}
              />
              {activeSessions.map((session) => (
                <Tab
                  key={session.id}
                  label={`Session: ${session.patientName}`}
                  value={session.id}
                  sx={{ textTransform: "none" }}
                />
              ))}
            </TabList>
          </Box>

          <TabPanel value="main">
            <div className="text-lg">
              <h2 className="text-xl font-semibold mb-4">Welcome to Doctor Office</h2>
              <p className="text-gray-600">
                Start a new session by clicking "See All Appointments" and selecting a patient.
              </p>
              <p className="text-gray-600 mt-2">
                Active Sessions: {activeSessions.length}
              </p>
            </div>
          </TabPanel>

          {activeSessions.map((session) => (
            <TabPanel key={session.id} value={session.id}>
              <SessionTabs
                session={session}
                onClose={() => closeSession(session.id)}
              />
            </TabPanel>
          ))}
        </TabContext>
      </div>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 400, height: "100%" }}
          role="presentation"
          py={2}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 10,
              padding: 2,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <h1 className="text-2xl font-semibold">Patients Queue</h1>
          </Box>
          <div className="w-full p-4">
            <div className="w-full p-4 border border-solid border-lightText/80 rounded-md shadow-sm mb-4">
              <div className="w-full mb-2">
                <h1 className="text-lg font-medium">Khaled Abd Elaziz</h1>
                <p className="text-sm text-lightText">Priority: Emergency</p>
                <p className="text-sm text-lightText">Age: 20</p>
                <p className="text-sm text-lightText">Wait Time: 20min</p>
              </div>
              <Button
                variant="contained"
                sx={{ textTransform: "none" }}
                fullWidth
                onClick={() => startSession({
                  name: "Khaled Abd Elaziz",
                  age: 20,
                  priority: "Emergency"
                })}
              >
                Start Appointment
              </Button>
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default Office;