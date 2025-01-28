import React, { useState } from "react";
import Header from "../Header";
import { Box, Button, Stack, Tab, Drawer } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useSelector } from "react-redux";
import { calculateWaitingTime } from "../../utils/TimeManipulationFunctions";
import SessionTabs from "./SessionTabs";



const Office = () => {
  const [outerTabValue, setOuterTabValue] = useState("main");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSessions, setActiveSessions] = useState([]);
  const { appointments } = useSelector((state) => state.appointments);
  const { generalSigns, otherSigns, generalInfo } = useSelector(
    (state) => state.signs
  );

  const [formData, setFormData] = useState(() => {
    const initialFormData = {
      files: [],
      ordonance: [],
      services: [],
      generalSigns: generalSigns.map((sign) => ({
        name: sign.name,
        value: "",
      })),
      otherSigns: otherSigns.map((sign) => ({
        name: sign.name,
        value: "",
      })),
    };

    generalInfo.forEach((info) => {
      initialFormData[info.name] = "";
    });

    return initialFormData;
  });

  const handleOuterTabChange = (event, newValue) => {
    setOuterTabValue(newValue);
  };

  const startSession = (appointment) => {
    const sessionId = Date.now().toString();
    const newSession = {
      id: sessionId,
      appointmentId: appointment.id,
      patientId: appointment.patient.id,
      patientName: appointment.patient.fullName,
      startedAt: new Date().toLocaleString(),
      category: appointment.category,
      formData: { ...formData },
      setFormData: (newData) => {
        setActiveSessions((prevSessions) =>
          prevSessions.map((s) =>
            s.id === sessionId ? { ...s, formData: newData } : s
          )
        );
      },
    };
    setActiveSessions([...activeSessions, newSession]);
    setOuterTabValue(sessionId);
    setDrawerOpen(false);
  };

  const closeSession = (sessionId) => {
    setActiveSessions(
      activeSessions.filter((session) => session.id !== sessionId)
    );
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
              <h2 className="text-xl font-semibold mb-4">
                Welcome to Doctor Office
              </h2>
              <p className="text-gray-600">
                Start a new session by clicking "See All Appointments" and
                selecting a patient.
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
        <Box sx={{ width: 400, height: "100%" }} role="presentation" py={2}>
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

          {appointments.map((appointment, index) => {
            return (
              <div key={index} className="w-full p-4">
                <div className="w-full p-4 border border-solid border-lightText/80 rounded-md shadow-sm">
                  <div className="w-full mb-2">
                    <h1 className="text-lg font-medium">
                      {appointment.patient.fullName}
                    </h1>
                    <p className="text-sm text-lightText">
                      Priority: {appointment.category}
                    </p>
                    <p className="text-sm text-lightText">
                      Age: {appointment.age}
                    </p>
                    <p className="text-sm text-lightText">
                      Wait Time:{" "}
                      {calculateWaitingTime(appointment.createdAt).formatted}
                    </p>
                  </div>
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    onClick={() => startSession(appointment)}
                  >
                    Start Appointment
                  </Button>
                </div>
              </div>
            );
          })}
        </Box>
      </Drawer>
    </>
  );
};

export default Office;
