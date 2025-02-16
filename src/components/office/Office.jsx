import React, { useState } from "react";
import {
  FaCalendar,
  FaClock,
  FaUserInjured,
  FaSearch,
  FaBell,
  FaFileMedical,
  FaUserMd,
} from "react-icons/fa";
import OfficeCard from "./OfficeCard";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  Paper,
  Typography,
  Box,
  Badge,
  Tab,
  Tabs,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { format, parse, differenceInMinutes } from "date-fns";
import { createSession } from "../../redux/sessionSlice";
import { useNavigate } from "react-router-dom";
import { updateAppointment } from "../../redux/appointmentsSlice";
import { TabContext, TabPanel } from "@mui/lab";



const Office = () => {
  const { appointments } = useSelector((state) => state.appointments);
  const [activeTab, setActiveTab] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cancelledAppointments = appointments.filter(
    (a) => a.status === "Cancelled"
  );
  const upcomingAppointments = appointments.filter(
    (a) => a.status === "Scheduled"
  );
  const completedAppointments = appointments.filter(
    (a) => a.status === "Completed"
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

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patient.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Function to calculate progress of the day
  const calculateDayProgress = () => {
    const now = new Date();
    const startOfDay = new Date(now.setHours(8, 0, 0, 0));
    const endOfDay = new Date(now.setHours(17, 0, 0, 0));
    const totalMinutes = differenceInMinutes(endOfDay, startOfDay);
    const elapsedMinutes = differenceInMinutes(now, startOfDay);
    return Math.min(100, Math.max(0, (elapsedMinutes / totalMinutes) * 100));
  };

  const renderPatientInfo = (appointment) => {
    const patient = appointment.patient;
    const parsedDate = parse(
      patient.birthday,
      "M/d/yyyy, h:mm:ss a",
      new Date()
    );
    const formattedDate = format(parsedDate, "d MMMM yyyy");

    const handleStartSession = (appointment) => {
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
      dispatch(updateAppointment({ ...appointment, status: "On Going" }));

      dispatch(createSession(newSession));
      navigate(`/office/sessions`);
    };

    return (
      <>
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <Avatar
              src={patient.profilePic || "/default-avatar.png"}
              sx={{ width: 56, height: 56 }}
            />
            <div>
              <Typography variant="h5" className="font-medium">
                {patient.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {patient.address}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Chip
              icon={<FaUserMd size={12} />}
              label={patient.insuranceProvider || "No Insurance"}
              variant="outlined"
              color="info"
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            />
            <Chip
              icon={<FaFileMedical size={12} />}
              label={`${patient.previous || 0} previous visits`}
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            />
          </div>
        </div>

        <Box className="grid grid-cols-3 grid-rows-2 gap-2 gap-y-6 mb-6 bg-gray-50 p-4 rounded-lg">
          <Box>
            <Typography variant="subtitle2" className="text-gray-600 mb-1">
              D.O.B
            </Typography>
            <Typography variant="body2">{formattedDate}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" className="text-gray-600 mb-1">
              Sex
            </Typography>
            <Typography variant="body2">
              {patient.sex ? "Male" : "Female"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" className="text-gray-600 mb-1">
              Blood Type
            </Typography>
            <Typography variant="body2">{patient.bloodtype}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" className="text-gray-600 mb-1">
              Etat Civil
            </Typography>
            <Typography variant="body2">{patient.etatCivil}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" className="text-gray-600 mb-1">
              Age
            </Typography>
            <Typography variant="body2">{appointments[0].age} years</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" className="text-gray-600 mb-1">
              Phone
            </Typography>
            <Typography variant="body2">
              {patient.phoneNumber || "Not provided"}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" className="mb-2">
          Medical Conditions
        </Typography>
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <Chip
            label="Asthma"
            variant="outlined"
            color="warning"
            sx={{ borderRadius: "6px" }}
          />
          <Chip
            label="Hypertension"
            variant="outlined"
            color="primary"
            sx={{ borderRadius: "6px" }}
          />
          <Chip
            label="Diabetes"
            variant="outlined"
            color="error"
            sx={{ borderRadius: "6px" }}
          />
          <Chip
            label="Add condition"
            variant="outlined"
            color="default"
            sx={{ borderRadius: "6px" }}
            onClick={() => {
              /* Add logic to add condition */
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="contained"
            startIcon={<FaFileMedical />}
            sx={{ textTransform: "none", borderRadius: "8px", px: 3 }}
          >
            Medical History
          </Button>
          <Button
            variant="outlined"
            sx={{ textTransform: "none", borderRadius: "8px", px: 3 }}
            onClick={() => handleStartSession(appointment)}
          >
            Start Appointment
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header with search and notifications */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <Typography variant="h4" className="font-semibold mb-2">
            Welcome Dr. Khaled
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </Typography>
        </div>

        <div className="flex items-center gap-4">
          <TextField
            size="small"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: "100%", sm: "250px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={3} color="error">
                <FaBell />
              </Badge>
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Day progress */}
      <Paper className="p-4 mb-6" elevation={0}>
        <div className="flex justify-between items-center mb-2">
          <Typography variant="body2" color="text.secondary">
            Working hours progress (8:00 AM - 5:00 PM)
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {Math.round(calculateDayProgress())}%
          </Typography>
        </div>
        <LinearProgress
          variant="determinate"
          value={calculateDayProgress()}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Paper>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cards.map((card, index) => (
          <OfficeCard key={index} card={card} />
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Appointments list */}
        <Paper className="lg:w-2/5 p-4" elevation={0}>
          <TabContext value={activeTab}>
            <div className="mb-4">
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  "& .MuiTab-root": { textTransform: "none" },
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tab
                  label={`Upcoming (${upcomingAppointments.length})`}
                  value="1"
                />
                <Tab
                  label={`Completed (${completedAppointments.length})`}
                  value="2"
                />
                <Tab
                  label={`Cancelled (${cancelledAppointments.length})`}
                  value="3"
                />
              </Tabs>
            </div>

            {["1", "2", "3"].map((tabValue, index) => (
              <TabPanel key={tabValue} value={tabValue} sx={{padding: 0}}>
                <div className="overflow-y-auto max-h-[600px]">
                  {(tabValue === "1"
                    ? upcomingAppointments
                    : tabValue === "2"
                    ? completedAppointments
                    : cancelledAppointments
                  ).length === 0 ? (
                    <Box className="py-8 text-center">
                      <Typography color="text.secondary">
                        No appointments found
                      </Typography>
                    </Box>
                  ) : (
                    (tabValue === "1"
                      ? upcomingAppointments
                      : tabValue === "2"
                      ? completedAppointments
                      : cancelledAppointments
                    )
                      .slice()
                      .reverse()
                      .map((appointment, index) => (
                        <React.Fragment key={index}>
                          <div className="py-3 px-6 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <Avatar
                                  src={
                                    appointment.patient.profilePic ||
                                    "/default-avatar.png"
                                  }
                                  sx={{ width: 40, height: 40 }}
                                />
                                <div>
                                  <Typography
                                    variant="subtitle1"
                                    className="font-medium"
                                  >
                                    {appointment.patient.fullName}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {appointment.time || "09:00 AM"} •{" "}
                                    {appointment.duration || "30 min"}
                                  </Typography>
                                </div>
                              </div>
                              <Chip
                                label={appointment.status || "Scheduled"}
                                color={
                                  appointment.status === "Completed"
                                    ? "success"
                                    : appointment.status === "Cancelled"
                                    ? "error"
                                    : appointment.status === "On Going"
                                    ? "warning"
                                    : "primary"
                                }
                                size="small"
                                sx={{ borderRadius: "6px" }}
                              />
                            </div>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              className="ml-12"
                            >
                              {appointment.reason || "Regular check-up"}
                            </Typography>
                          </div>
                          {index <
                            (tabValue === "1"
                              ? upcomingAppointments
                              : tabValue === "2"
                              ? completedAppointments
                              : cancelledAppointments
                            ).length -
                              1 && <Divider sx={{ my: 1 }} />}
                        </React.Fragment>
                      ))
                  )}
                </div>
              </TabPanel>
            ))}
          </TabContext>
        </Paper>

        {/* Patient details */}
        <Paper className="lg:w-3/5 p-6" elevation={0}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Next Appointment
          </Typography>

          {upcomingAppointments.length > 0 ? (
            renderPatientInfo(
              upcomingAppointments[upcomingAppointments.length - 1]
            )
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
