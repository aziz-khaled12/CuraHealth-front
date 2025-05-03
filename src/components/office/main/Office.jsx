import React, { useEffect, useState } from "react";
import { FaUserInjured, FaCalendar, FaClock } from "react-icons/fa";
import { Typography, Box, LinearProgress, Paper } from "@mui/material";
import { differenceInMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import AppointmentsList from "./AppointmentsList";
import OfficeHeader from "./OfficeHeader";
import { fetchAppointments } from "../../../redux/appointmentsSlice";
import { fetchAppointmentsData } from "../../../redux/appointmentDataSlice";
import { fetchPatients } from "../../../redux/patientsSlice";
import PatientDetails from "../officeUtils/PatientDetails";

const Office = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(fetchPatients());
    await dispatch(fetchAppointments());
    await dispatch(fetchAppointmentsData());
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { appointments } = useSelector((state) => state.appointments);
  const [activeTab, setActiveTab] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");

  const cancelledAppointments = appointments.filter(
    (a) => a.start_time === null
  );
  const upcomingAppointments = appointments.filter(
    (a) =>
      a.start_time === "0001-01-01T00:00:00Z" ||
      a.end_time === "0001-01-01T00:00:00Z"
  );
  const completedAppointments = appointments.filter(
    (a) =>
      a.start_time != "0001-01-01T00:00:00Z" &&
      a.end_time != "0001-01-01T00:00:00Z"
  );

  const cards = [
    {
      title: "Total Patients",
      icon: <FaUserInjured size={20} className="text-primary/80" />,
      value: "150",
      change: "+12% from last month",
      positive: true,
    },
    {
      title: "Today's Appointments",
      icon: <FaCalendar size={20} className="text-primary/80" />,
      value: appointments.length,
      change: "5 remaining",
      positive: true,
    },
    {
      title: "Average Wait Time",
      icon: <FaClock size={20} className="text-primary/80" />,
      value: "15 min",
      change: "-2 min from last week",
      positive: true,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [dayProgress, setDayProgress] = useState(0);


  const calculateDayProgress = () => {
    const temp = new Date();
    const startOfDay = new Date(temp.setHours(8, 0, 0, 0));
    const endOfDay = new Date(temp.setHours(17, 0, 0, 0));
    const now = new Date();
    const totalMinutes = differenceInMinutes(endOfDay, startOfDay);
    const elapsedMinutes = differenceInMinutes(now, startOfDay);
    return Math.min(100, Math.max(0, (elapsedMinutes / totalMinutes) * 100));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDayProgress(calculateDayProgress());
    }, 60000);

    setDayProgress(calculateDayProgress());

    return () => clearInterval(interval); 
  }, []);


  return (
    <div>

      <OfficeHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Paper className="p-4 mb-6" elevation={0}>
        <div className="flex justify-between items-center mb-2">
          <Typography variant="body2" color="text.secondary">
            Working hours progress (8:00 AM - 5:00 PM)
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {Math.round(dayProgress)}%
          </Typography>
        </div>
        <LinearProgress
          variant="determinate"
          value={dayProgress}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Paper>

      <div className="flex flex-col lg:flex-row gap-6">
        <Paper className="lg:w-2/5 p-4" elevation={0}>
          <AppointmentsList
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            upcomingAppointments={upcomingAppointments}
            completedAppointments={completedAppointments}
            cancelledAppointments={cancelledAppointments}
          />
        </Paper>

        <Paper className="lg:w-3/5 p-6" elevation={0}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Next Appointment
          </Typography>

          {upcomingAppointments.length > 0 ? (
            <PatientDetails
              appointment={
                upcomingAppointments[upcomingAppointments.length - 1]
              }
            />
          ) : (
            <Box className="py-8 text-center">
              <Typography color="text.secondary">
                No upcoming appointments
              </Typography>
            </Box>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default Office;
