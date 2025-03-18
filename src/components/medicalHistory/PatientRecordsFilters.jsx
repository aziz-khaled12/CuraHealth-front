import { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Chip,
  Divider,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { MdFilterAlt, MdRefresh, MdCalendarMonth } from "react-icons/md";

const PatientRecordsFilters = ({
  date,
  setDate,
  recordType,
  setRecordType,
  doctor,
  setDoctor,
  status,
  setStatus,
  diagnosis,
  setDiagnosis,
  medication,
  setMedication,
}) => {
  // Count active filters for badge
  const getActiveFiltersCount = () => {
    let count = 0;
    if (date) count++;
    if (recordType) count++;
    if (doctor) count++;
    if (status) count++;
    if (diagnosis) count++;
    if (medication) count++;
    return count;
  };

  // Reset all filters
  const handleReset = () => {
    setDate(null);
    setRecordType("");
    setDoctor("");
    setStatus("");
    setDiagnosis("");
    setMedication("");
  };

  // Apply filters
  const handleApply = () => {
    // Your filter application logic here
    console.log("Applying filters:", {
      date,
      recordType,
      doctor,
      status,
      diagnosis,
      medication,
    });
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div
      elevation={0}
      className="p-6 border border-blue-100 rounded-lg bg-white h-full shadow-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <Typography
            variant="h6"
            className="text-blue-700 font-semibold flex items-center"
          >
            <MdFilterAlt className="mr-2" />
            Filters
          </Typography>
          <Typography variant="body2" className="text-gray-600 mt-1">
            Refine your search results
          </Typography>
        </div>

        {activeFiltersCount > 0 && (
          <Chip
            label={`${activeFiltersCount} active`}
            color="primary"
            size="small"
            className="bg-blue-50 text-blue-700"
          />
        )}
      </div>

      <Divider className="mb-5" />

      <div className="grid gap-5">
        {/* Date Range */}
        <div className="relative">
          <TextField
            label="Date Range"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
            variant="outlined"
            className="bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            InputProps={{
              startAdornment: (
                <MdCalendarMonth className="mr-2 text-blue-500" />
              ),
            }}
          />
        </div>

        {/* Record Type */}
        <FormControl
          fullWidth
          variant="outlined"
          className="bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
        >
          <InputLabel>Record Type</InputLabel>
          <Select
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            label="Record Type"
          >
            <MenuItem value="">All record types</MenuItem>
            <MenuItem value="consultation">Consultation</MenuItem>
            <MenuItem value="lab-results">Lab Results</MenuItem>
            <MenuItem value="imaging">Imaging</MenuItem>
            <MenuItem value="prescription">Prescription</MenuItem>
            <MenuItem value="follow-up">Follow-up</MenuItem>
            <MenuItem value="annual-physical">Annual Physical</MenuItem>
          </Select>
        </FormControl>

        {/* Doctor */}
        <FormControl
          fullWidth
          variant="outlined"
          className="bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
        >
          <InputLabel>Doctor</InputLabel>
          <Select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            label="Doctor"
          >
            <MenuItem value="">All doctors</MenuItem>
            <MenuItem value="dr-chen">Dr. Michael Chen</MenuItem>
            <MenuItem value="dr-johnson">Dr. Sarah Johnson</MenuItem>
            <MenuItem value="dr-williams">Dr. Emily Williams</MenuItem>
          </Select>
        </FormControl>

        {/* Record Status */}
        <FormControl
          fullWidth
          variant="outlined"
          className="bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
        >
          <InputLabel>Record Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Record Status"
          >
            <MenuItem value="">All statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        {/* Diagnosis */}
        <FormControl
          fullWidth
          variant="outlined"
          className="bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
        >
          <InputLabel>Diagnosis</InputLabel>
          <Select
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            label="Diagnosis"
          >
            <MenuItem value="">All diagnoses</MenuItem>
            <MenuItem value="hypertension">Hypertension</MenuItem>
            <MenuItem value="routine-checkup">Routine Checkup</MenuItem>
            <MenuItem value="chest-xray">Chest X-ray</MenuItem>
            <MenuItem value="diabetes">Diabetes</MenuItem>
            <MenuItem value="asthma">Asthma</MenuItem>
          </Select>
        </FormControl>

        {/* Medication */}
        <FormControl
          fullWidth
          variant="outlined"
          className="bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
        >
          <InputLabel>Medication</InputLabel>
          <Select
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            label="Medication"
          >
            <MenuItem value="">All medications</MenuItem>
            <MenuItem value="lisinopril">Lisinopril</MenuItem>
            <MenuItem value="aspirin">Aspirin</MenuItem>
            <MenuItem value="atorvastatin">Atorvastatin</MenuItem>
            <MenuItem value="metformin">Metformin</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Divider className="my-6" />

      {/* Buttons */}
      <div className="flex justify-between gap-4 mt-2">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleReset}
          startIcon={<MdRefresh />}
          className="hover:bg-red-50 border-gray-300 text-gray-700 hover:border-red-200 transition-colors"
          disabled={activeFiltersCount === 0}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApply}
          startIcon={<MdFilterAlt />}
          className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default PatientRecordsFilters;
