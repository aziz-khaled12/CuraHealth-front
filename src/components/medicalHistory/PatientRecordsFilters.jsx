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
  Autocomplete,
} from "@mui/material";
import { MdFilterAlt, MdRefresh, MdCalendarMonth } from "react-icons/md";

const PatientRecordsFilters = ({
  date,
  setDate,
  recordTypes,
  recordType,
  setRecordType,
  doctors,
  doctor,
  setDoctor,
  status,
  setStatus,
  diagnosis,
  diagnosises,
  setDiagnosis,
  medication,
  medications,
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
  console.log("doctors: ", doctors);
  console.log("diagnosises: ", diagnosises);
  console.log("recordTypes: ", recordTypes);
  console.log("medications: ", medications);

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
            className="text-primary font-semibold flex items-center"
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
            className="bg-blue-50 text-primary"
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
                <MdCalendarMonth className="mr-2 !text-2xl text-primary" />
              ),
            }}
          />
        </div>

        {/* Record Type */}
        <Autocomplete
          fullWidth
          options={recordTypes.map((type) => type.name)}
          value={recordType}
          onChange={(event, newValue) => {
            setRecordType(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Record Type"
              variant="outlined"
              className="bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            />
          )}
        />


        {/* Doctor */}
        <Autocomplete
          fullWidth
          options={doctors.map((doc) => doc.userName)}
          value={doctor}
          onChange={(event, newValue) => {
            setDoctor(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Doctor"
              variant="outlined"
              className="bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            />
          )}
        />

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
        <Autocomplete
          fullWidth
          options={diagnosises.map((diag) => diag.name)}
          value={diagnosis}
          onChange={(event, newValue) => {
            setDiagnosis(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Diagnosis"
              variant="outlined"
              className="bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            />
          )}
        />

        {/* Medication */}
        <Autocomplete
          fullWidth
          options={medications.map((med) => med.NameDWA)}
          value={medication}
          onChange={(event, newValue) => {
            setMedication(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Medication"
              variant="outlined"
              className="bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            />
          )}
        />
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
          className="bg-primary hover:bg-primary/95 transition-colors shadow-md"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default PatientRecordsFilters;
