import React, { useEffect, useState } from "react";
import {
  Modal,
  TextField,
  Button,
  Box,
  Autocomplete,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../redux/appointmentsSlice";
import { calculateAge } from "../../utils/TimeManipulationFunctions";

const categories = [
  { name: "Emergency" },
  { name: "Normal" },
  { name: "Family" },
  { name: "Friend" },
];

const AddNewModal = ({ open, setOpen, cellData }) => {
  const dispatch = useDispatch();

  const fakePatients = useSelector((state) => state.patients.patients);
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [startDate, setStartDate] = useState(
    cellData ? cellData.startDate : new Date()
  );

  const [endDate, setEndDate] = useState(() => {
    if (cellData && cellData.endDate) {
      return cellData.endDate;
    }
    const newDate = new Date();
    newDate.setMinutes(newDate.getMinutes() + 30); // Add 30 minutes to current time
    return newDate;
  });

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [category, setCategory] = useState("Normal");

  const handleSubmitAppointment = () => {
    if (appointmentTitle && startDate && endDate) {
      const newAppointment = {
        title: appointmentTitle,
        patient: selectedPatient,
        age: calculateAge(selectedPatient.birthday),
        category: category,
        createdAt: new Date().toISOString(),
        modifiedAt: null,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      console.log("appointment: ", newAppointment);
      dispatch(addAppointment(newAppointment));
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
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "85vw",
            height: "84vh",
            overflowY: "auto",
            bgcolor: "#F7F7F7",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 className="mb-10 text-2xl font-semibold">Add Appointment</h2>
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
                    placeholder="Patient"
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
                  value={
                    selectedPatient
                      ? selectedPatient.sex == 0
                        ? "Female"
                        : "Male"
                      : ""
                  }
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
                <div className="w-full flex flex-col gap-3">
                  <h1 className="font-medium text-base">End Time</h1>
                  <TimePicker
                    fullWidth
                    placeholder="End Time"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
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
            onClick={handleSubmitAppointment}
            sx={{
              mt: 2,
              textTransform: "none",
              height: "45px",
              fontSize: "22",
              fontWeight: "500",
            }}
          >
            Add Appointment
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddNewModal;
