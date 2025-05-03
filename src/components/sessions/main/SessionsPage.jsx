import React, { useEffect, useMemo, useState } from "react";
import { Add } from "@mui/icons-material";
import { IconButton, Stack, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AllAppointmentsDrawer from "../sessionUtils/AllAppointmentsDrawer";
import Session from "./Session";
import { addSession } from "../../../redux/sessionSlice";
import { useNavigate } from "react-router-dom";
import { fetchAppointmentsData } from "../../../redux/appointmentDataSlice";
import {
  startAppointment,
  updateAppointment,
} from "../../../redux/appointmentsSlice";
import useHasPermission from "../../../hooks/useHasPermission";

const SessionsPage = () => {
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const sessions = useSelector((state) => state.sessions.sessions);
  console.log("sessions: ", sessions);


  useEffect(() => {
    dispatch(fetchAppointmentsData());
  }, []);

  useEffect(() => {
    if (sessions.length === 0) {
      navigate("/office");
    }
  }, [sessions.length, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const startSession = (appointment) => {
    const sessionId = Date.now().toString();
    const newSession = {
      sessionId,
      appointmentId: appointment.appointmnt_id,
      patientId: appointment.patient_id,
      patientName: `${appointment.first_name} ${appointment.last_name}`,
      doctor: "Dr. Khaled Aziz",
      type: "Consultation",
      startedAt: new Date().toLocaleString(),
      finishedAt: null,
      category: appointment.category,
    };
    dispatch(updateAppointment({ ...appointment, status: "On Going" }));
    dispatch(addSession({ sessionId, sessionData: newSession }));
    dispatch(startAppointment({AppointmntID: appointment.appointmnt_id, ServiceID: appointment.service_id}));
    setDrawerOpen(false);
  };

  return (
    <div className="h-full overflow-hidden">
      <Stack direction={"column"} sx={{ height: "91vh" }}>
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
              {sessions.map((session, index) => (
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
                  key={session.sessionId}
                  label={session.patientName}
                />
              ))}
            </TabList>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ padding: "8px" }}
              size="small"
              color="primary"
            >
              <Add />
            </IconButton>
          </Stack>

          {sessions.length > 0 && sessions.map((session, index) => (
            <TabPanel key={session.sessionId} value={index}>
              <Session sessionId={session.sessionId} />
            </TabPanel>
          ))}
        </TabContext>
      </Stack>

      <AllAppointmentsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        startSession={startSession}
      />
    </div>
  );
};

export default SessionsPage;
