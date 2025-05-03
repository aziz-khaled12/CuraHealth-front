import { Grid2, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./records.css";
import { DataGrid } from "@mui/x-data-grid";
import { format, set } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PatientSessionCard from "./PatientSessionCard";
import PatientRecordsSearch from "./PatientRecordsSearch";
import PatientRecordsFilters from "./PatientRecordsFilters";
import MedicalHistoryModal from "./MedicalHistoryModal";
import { fetchPatientRecords } from "../../utils/services";
import { fetchUsers } from "../../redux/usersSlice";
import { fetchServices } from "../../redux/servicesSlice";
import { fetchAppointmentsData } from "../../redux/appointmentDataSlice";

const PatientRecords = () => {
  const [sortFilter, setSortFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("table");
  const dispatch = useDispatch();
  const patientId = useParams().id;
  const [dateFilter, setDateFilter] = useState(null);
  const [recordTypeFilter, setRecordTypeFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [diagnosisFilter, setDiagnosisFilter] = useState("");
  const [medicationFilter, setMedicationFilter] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [patientSessions, setPatientSessions] = useState([]);


  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchServices())
    dispatch(fetchAppointmentsData())
  }, []);

  const doctors = useSelector((state) => state.users.users.filter((user) => user.type === "Doctor"));
  const recordTypes = useSelector((state) => state.services.services);  
  const diagnosises = useSelector((state) => state.appointmentsData.diagnoses);
  const medications = useSelector((state) => state.appointmentsData.medicaments);



  useEffect(() => {
    fetchPatientRecords(patientId, setPatientSessions);
  }, [])

  useEffect(() => {
    console.log("patientSessions", patientSessions);
  }, [patientSessions]);


  const handleChange = (event) => {
    setSortFilter(event.target.value);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (value, row) =>
        format(new Date(row.startedAt), "yyyy-MM-dd hh:mm a"),
    },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "doctor", headerName: "Doctor", flex: 1 },
    {
      field: "diagnosis",
      headerName: "Diagnosis",
      flex: 1,
      valueGetter: (value, row) => row.diagnosis[0],
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Option 1</MenuItem>
            <MenuItem onClick={handleClose}>Option 2</MenuItem>
            <MenuItem onClick={handleClose}>Option 3</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const filteredSessions = patientSessions.filter((session) => {
    // Date filter
    if (dateFilter) {
      const sessionDate = format(new Date(session.startedAt), "yyyy-MM-dd");
      if (sessionDate !== dateFilter) return false;
    }

    // Record type filter
    if (
      recordTypeFilter &&
      session.type.toLowerCase() !== recordTypeFilter.toLowerCase()
    )
      return false;

    // Doctor filter
    if (doctorFilter && !session.doctor.includes(doctorFilter)) return false;

    // Status filter
    if (
      statusFilter &&
      session.status.toLowerCase() !== statusFilter.toLowerCase()
    )
      return false;

    // Diagnosis filter
    if (
      diagnosisFilter &&
      !session.diagnosis.some((d) =>
        d.toLowerCase().includes(diagnosisFilter.toLowerCase())
      )
    )
      return false;

    // Medication filter
    if (
      medicationFilter &&
      !session.medicaments.some((m) =>
        m.name.toLowerCase().includes(medicationFilter.toLowerCase())
      )
    )
      return false;

    return true;
  });

  // Also apply the search query filter
  const searchFilteredSessions = filteredSessions.filter((session) => {
    if (!searchQuery) return true;

    // Search in multiple fields
    return (
      session.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.diagnosis.some((d) =>
        d.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      session.medicaments.some((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    // big container
    <div className="flex gap-2 w-full h-full">
      {/* filter container */}
      <div className="flex-1">
        <PatientRecordsFilters
          date={dateFilter}
          setDate={setDateFilter}
          recordTypes={recordTypes}
          recordType={recordTypeFilter}
          setRecordType={setRecordTypeFilter}
          doctor={doctorFilter}
          doctors={doctors}
          setDoctor={setDoctorFilter}
          status={statusFilter}
          setStatus={setStatusFilter}
          diagnosises={diagnosises}
          diagnosis={diagnosisFilter}
          setDiagnosis={setDiagnosisFilter}
          medication={medicationFilter}
          medications={medications}
          setMedication={setMedicationFilter}
        />
      </div>

      {/* records container */}
      <div className="flex-[3] flex flex-col gap-4 h-full">
        {/* search container */}
        <PatientRecordsSearch
          setSearch={setSearchQuery}
          selected={selected}
          setSelected={setSelected}
          setFilters={setSortFilter}
          filters={sortFilter}
        />

        {/* records */}
        <div className="h-full max-h-[74vh] overflow-auto custom-scrollbar">
          {selected === "table" ? (
            <div className="h-full">
              {" "}
              <DataGrid
                columns={columns}
                rows={searchFilteredSessions}
                autoPageSize
                getRowId={(row) => row.id}
              />
            </div>
          ) : (
            <Grid2 container spacing={1}>
              {searchFilteredSessions.map((session) => (
                <Grid2 key={session.id} size={6}>
                  <PatientSessionCard
                    session={session}
                    handleViewDetails={setSelectedSession}
                  />
                </Grid2>
              ))}
            </Grid2>
          )}
        </div>
      </div>
      {selectedSession && (
        <MedicalHistoryModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
};

export default PatientRecords;
