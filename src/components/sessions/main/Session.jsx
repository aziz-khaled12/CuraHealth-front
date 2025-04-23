import React, { useEffect } from "react";
import Vitals from "./Vitals";
import { Box, Button, Divider, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaFileInvoice, FaPrint } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { deleteSession } from "../../../redux/sessionSlice";
import ChipsSelect from "./ChipsSelect";
import PatientInfo from "../../random/PatientInfo";
import InfoSection from "../../random/InfoSection";
import Medicaments from "./Medicaments";
import {
  updateAppointment,
  endAppointment,
  submitAppointmentData,
} from "../../../redux/appointmentsSlice";
import useHasPermission from "../../../hooks/useHasPermission";
import { fetchServices } from "../../../redux/servicesSlice";
import TestDocs from "../../random/TestDocs";

export default function Session({ sessionId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServices());
  }, [])
  const { services } = useSelector((state) => state.services);
  const canCancel = useHasPermission("cancel Appointments");
  const canEnd = useHasPermission("end Appointments");

  const session = useSelector(
    (state) =>
      state.sessions.sessions.filter(
        (session) => session.sessionId === sessionId
      )[0]
  );
  const appointmentId = session.appointmentId;
  const appointment = useSelector(
    (state) =>
      state.appointments.appointments.filter(
        (appointment) => appointment.appointmnt_id === appointmentId
      )[0]
  );

  const {
    diagnoses,
    medicaments,
    physicalSigns,
    functionalSigns,
    consultationCauses,
  } = useSelector((state) => state.appointmentsData);

  const sections = [
    {
      name: "consultationCauses",
      title: "Consultation Cause",
      data: consultationCauses,
    },
    { name: "physicalSigns", title: "Physical Signs", data: physicalSigns },
    {
      name: "functionalSigns",
      title: "Functional Signs",
      data: functionalSigns,
    },
    {
      name: "services",
      title: "Services",
      data: services,
    },
    {
      name: "diagnoses",
      title: "Diagnosis",
      data: diagnoses,
    },
  ];

  const closeVisit = () => {
    dispatch(submitAppointmentData({ appointmentId, sessionId }));
    dispatch(endAppointment(appointmentId));
    dispatch(deleteSession(sessionId));
  };

  const cancelVisit = () => {
    dispatch(updateAppointment({ ...appointment, status: "Cancelled" }));
    dispatch(deleteSession(sessionId)); // Dispatch the action
  };

  const tabs = [
    canEnd && {
      icon: <FaCheckCircle className="text-primary text-base" />,
      title: "Close Visit",
      click: closeVisit,
    },
    canCancel && {
      icon: <FaCircleXmark className="text-primary text-base" />,
      title: "Cancel Visit",
      click: cancelVisit,
    },
    {
      icon: <FaPrint className="text-primary" />,
      title: "Print",
    },
    {
      icon: <FaFileInvoice className="text-primary" />,
      title: "Invoices",
    },
  ];

  useEffect(() => {
    console.log("Session data: ", session)
  }, [session])

  return (
    <Box className="w-full flex gap-4 items-start justify-between min-h-[40vh] bg-lightBg">
      <Box className="w-[75%] ">
        <Stack
          direction="row"
          className="w-full rounded-lg text-sm font-medium border border-[#B4B4B4] mb-2"
        >
          {tabs.map((tab, index) => (
            <React.Fragment key={index}>
              <Button
                sx={{
                  textTransform: "none",
                  color: "#000",
                  gap: "8px",
                  borderRight: "1px solid #B4B4B4",
                  ...(index === 0 && {
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                  }),
                  borderRadius: "0px",
                  padding: "8px 16px",
                }}
                onClick={tab.click}
              >
                {tab.icon}
                <span>{tab.title}</span>
              </Button>
              {index < tabs.length - 1 && (
                <Divider flexItem variant="fullWidth" />
              )}
            </React.Fragment>
          ))}
        </Stack>
        <section className="overflow-y-scroll py-3 max-h-[69vh] flex flex-col gap-2 custom-scrollbar">
          {/* Vitals Section */}
          <Vitals id={sessionId} />

          {/* Other Sections */}
          {sections.map((section, index) => {
            return (
              <ChipsSelect
                key={index}
                data={section.data}
                title={section.title}
                name={section.name}
                id={sessionId}
              />
            );
          })}

          {/* Medicaments Section */}
          <Medicaments id={sessionId} availableMedicaments={medicaments} />
          <TestDocs sessionId={sessionId}/>
        </section>
      </Box>

      {/* Patient Info Sidebar */}
      <section className="w-[25%] flex flex-col gap-4 h-[80vh]">
        <PatientInfo />
        <InfoSection title="Medical History" height="70%" />
        <InfoSection title="Invoices" height="10%" />
      </section>
    </Box>
  );
}
