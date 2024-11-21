import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAppointment } from "../../redux/appointmentsSlice";

const categories = [
  { name: "Emergency" },
  { name: "Normal" },
  { name: "Family" },
  { name: "Friend" },
];

const fakePatients = [
  {
    id: "1",
    fullName: "John Doe",
    birthday: "1985-05-15",
    address: "123 Elm Street, Springfield, IL",
    email: "john.doe@example.com",
    phoneNumber: "555-1234",
    sex: "Male",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    birthday: "1990-10-22",
    address: "456 Oak Avenue, Springfield, IL",
    email: "jane.smith@example.com",
    phoneNumber: "555-5678",
    sex: "Female",
  },
  {
    id: "3",
    fullName: "Alice Johnson",
    birthday: "1982-03-30",
    address: "789 Pine Road, Springfield, IL",
    email: "alice.johnson@example.com",
    phoneNumber: "555-8765",
    sex: "Female",
  },
  {
    id: "4",
    fullName: "Bob Brown",
    birthday: "1978-07-19",
    address: "101 Maple Lane, Springfield, IL",
    email: "bob.brown@example.com",
    phoneNumber: "555-4321",
    sex: "Male",
  },
];

const ModifyModal = ({ open, setOpen, cellData }) => {

  const dispatch = useDispatch()

  const [selectedPatient, setSelectedPatient] = useState(cellData.patient);
  const [appointmentTitle, setAppointmentTitle] = useState(cellData.title);
  const [startDate, setStartDate] = useState(
    cellData ? cellData.startDate : new Date()
  );
  const [endDate, setEndDate] = useState(
    cellData ? cellData.endDate : new Date()
  );
  const [category, setCategory] = useState("Normal");



  const handleEditAppointment = () => {
    if (appointmentTitle && startDate && endDate) {
      const newAppointment = {
        id: cellData.id,
        title: appointmentTitle,
        patient: selectedPatient,
        category: category,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      dispatch(updateAppointment(newAppointment));
      handleClose();
    }
  };

  const handlePatientSelect = (event, value) => {
    if (value) {
      setSelectedPatient(value);
      setAppointmentTitle(value.fullName);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setAppointmentTitle("");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (

    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1300,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 className="mb-10 text-2xl font-semibold">Edit Appointment</h2>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start w-full">
            <h1 className="text-base font-medium mb-3">Patient</h1>
            <Autocomplete
              sx={{ margin: "0" }}
              fullWidth
              freeSolo
              options={fakePatients}
              getOptionLabel={(option) => option.fullName}
              onChange={handlePatientSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder={cellData.patient.fullName}
                  variant="outlined"
                />
              )}
              renderOption={(props, option) => (
                <>
                  <MenuItem {...props} key={option.id}>
                    {option.fullName}
                  </MenuItem>
                </>
              )}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-3">Address</h1>
              <TextField
                disabled={!selectedPatient}
                className="w-full"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                name="address"
                placeholder="Address"
                value={selectedPatient ? selectedPatient.address : ""}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-3">Patient ID</h1>
              <TextField
                className="w-full"
                disabled={!selectedPatient}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                name="id"
                placeholder="Patient ID"
                value={selectedPatient ? selectedPatient.id : ""}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-3">Email</h1>
              <TextField
                disabled={!selectedPatient}
                className="w-full"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                name="email"
                placeholder="Email"
                value={selectedPatient ? selectedPatient.email : ""}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-3">Phone Number</h1>
              <TextField
                disabled={!selectedPatient}
                className="w-full"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                name="phoneNumber"
                placeholder="Phone Number"
                value={selectedPatient ? selectedPatient.phoneNumber : ""}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-3">Category</h1>
              <FormControl fullWidth>
                <Select
                  className="w-full"
                  name="category"
                  hiddenLabel
                  value={category}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category, index) => {
                    return (
                      <MenuItem value={category.name} key={index}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-3">Sex</h1>
              <TextField
                className="w-full"
                disabled={!selectedPatient}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                name="sex"
                placeholder="Sex"
                value={selectedPatient ? selectedPatient.sex : ""}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="w-full flex flex-col gap-3">
                <h1 className="text-base font-medium">Select Date</h1>
                <DatePicker
                  fullWidth
                  placeholder="Select Date"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField fullWidth margin="normal" {...params} />
                  )}
                />
              </div>

              <div className="w-full flex flex-col gap-3">
                <h1 className="font-medium text-base">Start Time</h1>
                <TimePicker
                  fullWidth
                  placeholder="Start Time"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField fullWidth margin="normal" {...params} />
                  )}
                />
              </div>
            </LocalizationProvider>
          </div>
        </div>
        <Button
          variant="contained"
          className="!bg-primary"
          fullWidth
          onClick={handleEditAppointment}
          sx={{
            mt: 2,
            textTransform: "none",
            height: "45px",
            fontSize: "22",
            fontWeight: "500",
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default ModifyModal;
