import {
  Divider,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FaSearch, FaSortNumericDown, FaTable } from "react-icons/fa";
import "./records.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PatientSessionCard from "./PatientSessionCard";
import PatientRecordsSearch from "./PatientRecordsSearch";
import PatientRecordsFilters from "./PatientRecordsFilters";
import MedicalHistoryModal from "./MedicalHistoryModal";
import { fetchPatients } from "../../redux/patientsSlice";

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

  useEffect(() => {
    dispatch(fetchPatients());
  }, []);

  const patient = useSelector((state) =>
    state.patients.patients.find((patient) => patient.PatientID == patientId)
  );

  const patientSessions = [
    {
      id: 0,
      doctor: "Dr. Khaled Aziz",
      type: "Consultation",
      startedAt: new Date("2025-03-10T14:30:00Z"),
      category: "General",
      status: "Completed",
      patientName: "Khaled Abd Elaziz",
      diagnosis: ["Hypertension", "Type 2 Diabetes"],
      consultationCause: ["Headache", "Fatigue"],
      vitals: [
        { name: "Blood Pressure", value: "130/85 mmHg" },
        { name: "Heart Rate", value: "78 bpm" },
        { name: "Temperature", value: "98.6°F" },
        { name: "Respiratory Rate", value: "16 breaths/min" },
      ],
      medicaments: [
        { name: "Metformin", dosage: "500mg" },
        { name: "Lisinopril", dosage: "10mg" },
      ],
      physicalSigns: ["Pale skin", "Slightly elevated BP"],
      functionalSigns: ["Mild dizziness", "Occasional shortness of breath"],
      services: ["Blood Test", "ECG", "Prescription Refill"],
      files: [],
    },
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      type: "Consultation",
      startedAt: new Date("2025-03-09T09:15:00Z"),
      category: "Cardiology",
      status: "Completed",
      patientName: "John Doe",
      diagnosis: ["Atrial Fibrillation"],
      consultationCause: ["Irregular heartbeat", "Shortness of breath"],
      vitals: [
        { name: "Blood Pressure", value: "140/90 mmHg" },
        { name: "Heart Rate", value: "110 bpm" },
        { name: "Temperature", value: "98.4°F" },
      ],
      medicaments: [{ name: "Aspirin", dosage: "81mg" }],
      physicalSigns: ["Mild swelling in ankles"],
      functionalSigns: ["Dizziness on exertion"],
      services: ["Echocardiogram", "Blood Test"],
      files: [],
    },
    {
      id: 2,
      doctor: "Dr. Ahmed Omar",
      type: "Consultation",
      startedAt: new Date("2025-03-08T15:45:00Z"),
      category: "Neurology",
      status: "Ongoing",
      patientName: "Emily Roberts",
      diagnosis: ["Migraine"],
      consultationCause: ["Severe headache", "Light sensitivity"],
      vitals: [
        { name: "Blood Pressure", value: "120/80 mmHg" },
        { name: "Heart Rate", value: "72 bpm" },
        { name: "Temperature", value: "98.2°F" },
      ],
      medicaments: [{ name: "Sumatriptan", dosage: "50mg" }],
      physicalSigns: ["No abnormal findings"],
      functionalSigns: ["Occasional nausea"],
      services: ["MRI Scan"],
      files: [],
    },
    {
      id: 3,
      doctor: "Dr. Olivia White",
      type: "Consultation",
      startedAt: new Date("2025-03-07T11:00:00Z"),
      category: "Dermatology",
      status: "Completed",
      patientName: "Michael Brown",
      diagnosis: ["Eczema"],
      consultationCause: ["Itchy skin", "Dry patches"],
      vitals: [
        { name: "Blood Pressure", value: "125/85 mmHg" },
        { name: "Heart Rate", value: "80 bpm" },
      ],
      medicaments: [
        { name: "Hydrocortisone Cream", dosage: "Apply twice daily" },
      ],
      physicalSigns: ["Red, flaky skin"],
      functionalSigns: ["Itchiness at night"],
      services: ["Skin Allergy Test"],
      files: [],
    },
    {
      id: 4,
      doctor: "Dr. Liam Carter",
      type: "Consultation",
      startedAt: new Date("2025-03-06T16:20:00Z"),
      category: "Pulmonology",
      status: "Pending",
      patientName: "Sophia Martinez",
      diagnosis: ["Asthma"],
      consultationCause: ["Wheezing", "Chest tightness"],
      vitals: [
        { name: "Blood Pressure", value: "118/78 mmHg" },
        { name: "Heart Rate", value: "75 bpm" },
        { name: "Respiratory Rate", value: "20 breaths/min" },
      ],
      medicaments: [{ name: "Albuterol", dosage: "2 puffs as needed" }],
      physicalSigns: ["Mild wheezing"],
      functionalSigns: ["Difficulty breathing at night"],
      services: ["Pulmonary Function Test"],
      files: [],
    },
    {
      id: 5,
      doctor: "Dr. Emily Wilson",
      type: "Consultation",
      startedAt: new Date("2025-03-05T10:45:00Z"),
      category: "Endocrinology",
      status: "Completed",
      patientName: "Daniel Lee",
      diagnosis: ["Hypothyroidism"],
      consultationCause: ["Fatigue", "Weight gain"],
      vitals: [
        { name: "Blood Pressure", value: "122/80 mmHg" },
        { name: "Heart Rate", value: "70 bpm" },
      ],
      medicaments: [{ name: "Levothyroxine", dosage: "50mcg" }],
      physicalSigns: ["Dry skin", "Cold intolerance"],
      functionalSigns: ["Low energy levels"],
      services: ["Thyroid Function Test"],
      files: [],
    },
    {
      id: 6,
      doctor: "Dr. Noah Thompson",
      type: "Consultation",
      startedAt: new Date("2025-03-04T14:10:00Z"),
      category: "Orthopedics",
      status: "Completed",
      patientName: "Lucas Anderson",
      diagnosis: ["Knee Osteoarthritis"],
      consultationCause: ["Knee pain", "Stiffness"],
      vitals: [
        { name: "Blood Pressure", value: "128/84 mmHg" },
        { name: "Heart Rate", value: "76 bpm" },
      ],
      medicaments: [{ name: "Ibuprofen", dosage: "400mg" }],
      physicalSigns: ["Mild knee swelling"],
      functionalSigns: ["Pain on movement"],
      services: ["X-ray"],
      files: [],
    },
    {
      id: 7,
      doctor: "Dr. Ava Scott",
      type: "Consultation",
      startedAt: new Date("2025-03-03T09:30:00Z"),
      category: "Gastroenterology",
      status: "Ongoing",
      patientName: "Emma King",
      diagnosis: ["Gastritis"],
      consultationCause: ["Abdominal pain", "Nausea"],
      vitals: [
        { name: "Blood Pressure", value: "115/75 mmHg" },
        { name: "Heart Rate", value: "68 bpm" },
      ],
      medicaments: [{ name: "Omeprazole", dosage: "20mg" }],
      physicalSigns: ["Mild bloating"],
      functionalSigns: ["Burning sensation in stomach"],
      services: ["Endoscopy"],
      files: [],
    },
    {
      id: 8,
      doctor: "Dr. William Harris",
      type: "Consultation",
      startedAt: new Date("2025-03-02T12:00:00Z"),
      category: "Ophthalmology",
      status: "Completed",
      patientName: "Isabella Evans",
      diagnosis: ["Conjunctivitis"],
      consultationCause: ["Red eyes", "Itching"],
      vitals: [
        { name: "Blood Pressure", value: "118/76 mmHg" },
        { name: "Heart Rate", value: "72 bpm" },
      ],
      medicaments: [{ name: "Antibiotic Eye Drops", dosage: "3 times a day" }],
      physicalSigns: ["Swollen eyelids"],
      functionalSigns: ["Blurred vision"],
      services: ["Eye Exam"],
      files: [],
    },
    {
      id: 9,
      doctor: "Dr. Mia Rodriguez",
      type: "Consultation",
      startedAt: new Date("2025-03-01T17:30:00Z"),
      category: "Psychiatry",
      status: "Pending",
      patientName: "Ethan Walker",
      diagnosis: ["Generalized Anxiety Disorder"],
      consultationCause: ["Excessive worry", "Sleep disturbances"],
      vitals: [
        { name: "Blood Pressure", value: "120/78 mmHg" },
        { name: "Heart Rate", value: "74 bpm" },
      ],
      medicaments: [{ name: "Sertraline", dosage: "50mg" }],
      physicalSigns: ["None observed"],
      functionalSigns: ["Difficulty concentrating"],
      services: ["Psychological Assessment"],
      files: [],
    },
    {
      id: 10,
      doctor: "Dr. Benjamin Lee",
      type: "Consultation",
      startedAt: new Date("2025-02-28T13:40:00Z"),
      category: "Urology",
      status: "Completed",
      patientName: "Sophia Parker",
      diagnosis: ["Urinary Tract Infection"],
      consultationCause: ["Frequent urination", "Burning sensation"],
      vitals: [
        { name: "Blood Pressure", value: "119/79 mmHg" },
        { name: "Heart Rate", value: "77 bpm" },
      ],
      medicaments: [{ name: "Ciprofloxacin", dosage: "500mg" }],
      physicalSigns: ["Mild tenderness in lower abdomen"],
      functionalSigns: ["Painful urination"],
      services: ["Urinalysis"],
      files: [],
    },
  ];

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
          recordType={recordTypeFilter}
          setRecordType={setRecordTypeFilter}
          doctor={doctorFilter}
          setDoctor={setDoctorFilter}
          status={statusFilter}
          setStatus={setStatusFilter}
          diagnosis={diagnosisFilter}
          setDiagnosis={setDiagnosisFilter}
          medication={medicationFilter}
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
