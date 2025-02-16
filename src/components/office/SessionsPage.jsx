import { Add } from "@mui/icons-material";
import { IconButton, Stack, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AllAppointmentsDrawer from "./sessionUtils/AllAppointmentsDrawer";
import Session from "./Session";
import { createSession } from "../../redux/sessionSlice";
import { useNavigate } from "react-router-dom";

const SessionsPage = () => {
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessions } = useSelector((state) => state.sessions);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (sessions.length === 0) {
      navigate("/office")
    }
    
  }, [sessions]);

  const startSession = (appointment) => {
    const sessionId = Date.now().toString();
    const newSession = {
      sessionId,
      appointmentId: appointment.id,
      patientId: appointment.patient.id,
      patientName: appointment.patient.fullName,
      startedAt: new Date().toLocaleString(),
      finishedAt: null,
      category: appointment.category,
      vitals: [],
      consultationCause: [],
      physicalSigns: [],
      functionalSigns: [],
      services: [],
      diagnosis: [],
      files: [],
    };
    dispatch(createSession(newSession));
    setDrawerOpen(false);
  };

  useEffect(() => {
    console.log(sessions);
  }, [sessions]);

  return (
    <>
      <Stack direction={"column"}>
        <TabContext value={value}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ backgroundColor: "white" }}
            pt={1}
          >
            <TabList
              onChange={handleChange}
              sx={{
                position: "relative",
                "& .MuiTabs-indicator": {
                  top: 0, 
                  bottom: "unset",
                  height: "4px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                },
              }}
            >
              {sessions.map((session, index) => {
                return (
                  <Tab
                    sx={{
                      textTransform: "none",
                      transition: "0.3s",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      bgcolor: value === index ? "#f7f7f7" : "transparent",
                      "&.Mui-selected": {
                        color: "black",
                      },
                    }}
                    key={index}
                    label={session.patientName}
                  ></Tab>
                );
              })}
            </TabList>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ padding: "8px" }}
              size="small"
              color="primary"
            >
              {" "}
              <Add />{" "}
            </IconButton>
          </Stack>

          {sessions.map((session, index) => {
            return (
              <TabPanel key={index} value={index}>
                <Session sessionId={session.sessionId} />
              </TabPanel>
            );
          })}
        </TabContext>
      </Stack>

      <AllAppointmentsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        startSession={startSession}
      />
    </>
  );
};

export default SessionsPage;
