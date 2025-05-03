import React from "react";
import { FaUserMd, FaFileMedical } from "react-icons/fa";
import { Avatar, Button, Chip, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  startAppointment,
  updateAppointment,
} from "../../../redux/appointmentsSlice";
import { addSession } from "../../../redux/sessionSlice";
import useHasPermission from "../../../hooks/useHasPermission";

const PatientDetails = ({ appointment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const patient = useSelector((state) =>
    state.patients.patients.find((p) => p.PatientID === appointment.patient_id)
  );

  console.log("appointment:", appointment);

  const canStartAppointment = useHasPermission("start Appointments");
  const canSeeRecords = useHasPermission("see All Patient Records");

  const formattedDate = format(appointment.birth_day, "d MMMM yyyy");

  const handleStartSession = async (appointment) => {
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

    navigate(`/office/sessions`);
  };

  return (
    patient && 
    <>
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-2">
          <Avatar src={"/default-avatar.png"} sx={{ width: 56, height: 56 }} />
          <div>
            <Typography variant="h5" className="font-medium">
              {`${patient.FirstName} ${patient.LastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {patient.Address}
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
            {patient.Sex === "M" ? "Male" : "Female"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" className="text-gray-600 mb-1">
            Blood Type
          </Typography>
          <Typography variant="body2">{patient.BloodTypeName}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" className="text-gray-600 mb-1">
            Etat Civil
          </Typography>
          <Typography variant="body2">{patient.EtatCivileName}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" className="text-gray-600 mb-1">
            Age
          </Typography>
          <Typography variant="body2">{appointment.age} years</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" className="text-gray-600 mb-1">
            Phone
          </Typography>
          <Typography variant="body2">
            {patient.PhoneNum || "Not provided"}
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
        {canSeeRecords && (
          <Button
            All
            Patient
            Records
            variant="contained"
            startIcon={<FaFileMedical />}
            sx={{ textTransform: "none", borderRadius: "8px", px: 3 }}
          >
            Medical History
          </Button>
        )}
        {canStartAppointment && (
          <Button
            variant="outlined"
            sx={{ textTransform: "none", borderRadius: "8px", px: 3 }}
            onClick={() => handleStartSession(appointment)}
          >
            Start Appointment
          </Button>
        )}
      </div>
    </>
  );
};

export default PatientDetails;
