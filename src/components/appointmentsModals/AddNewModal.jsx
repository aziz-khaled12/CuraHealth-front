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
  FormHelperText,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useDispatch, useSelector } from "react-redux";
import {
  addAppointment,
  createAppointment,
  fetchAppointmentCategories,
} from "../../redux/appointmentsSlice";

import { fetchPatients } from "../../redux/patientsSlice";
import { fetchServices } from "../../redux/servicesSlice";
import { fetchUsers } from "../../redux/usersSlice";
import { showAlert } from "../../redux/alertSlice";

const AddNewModal = ({ open, setOpen, cellData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchAppointmentCategories());
    dispatch(fetchPatients());
    dispatch(fetchUsers());
  }, []);

  const { categories, appointmentStatus } = useSelector((state) => state.appointments);
  const { patients } = useSelector((state) => state.patients);
  const { services } = useSelector((state) => state.services);
  const doctors = useSelector((state) =>
    state.users.users.filter((user) => user.type === "Doctor")
  );

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
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [category, setCategory] = useState(categories[1]);
  const [service, setService] = useState(services[1]);
  
  // Form validation state
  const [errors, setErrors] = useState({
    patient: false,
    doctor: false,
    service: false,
    category: false,
    date: false,
    startTime: false,
    endTime: false,
  });
  
  // Form touched state to show errors only after interaction
  const [touched, setTouched] = useState({
    patient: false,
    doctor: false,
    service: false,
    category: false,
    date: false,
    startTime: false,
    endTime: false,
  });

  // Validate the form before submission
  const validateForm = () => {
    const newErrors = {
      patient: !selectedPatient,
      doctor: !selectedDoctor,
      service: !service,
      category: !category,
      date: !startDate,
      startTime: !startDate,
      endTime: !endDate || endDate <= startDate,
    };
    
    setErrors(newErrors);
    setTouched({
      patient: true,
      doctor: true,
      service: true,
      category: true,
      date: true,
      startTime: true,
      endTime: true,
    });
    
    // Return true if no errors
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmitAppointment = () => {
    if (!validateForm()) {
      return;
    }
    
    const newAppointment = {
      DoctorID: selectedDoctor.id,
      PatientID: selectedPatient.PatientID,
      ForTime: endDate,
      ApponmentCategoryID: category.ApponmentCategoryID,
      ServiceID: service.id,
    };

    dispatch(createAppointment(newAppointment));
    if (appointmentStatus === "success") {
      dispatch(showAlert({message: "Appointment Added Succefuly", severity: "success"}))
      handleClose();
    }
  };

  const handlePatientSelect = (event, value) => {
    setTouched({ ...touched, patient: true });
    if (value) {
      setSelectedPatient(value);
      setErrors({ ...errors, patient: false });
    } else {
      setSelectedPatient(null);
      setErrors({ ...errors, patient: true });
    }
  };

  const handleDoctorSelect = (event, value) => {
    setTouched({ ...touched, doctor: true });
    if (value) {
      setSelectedDoctor(value);
      setErrors({ ...errors, doctor: false });
    } else {
      setSelectedDoctor(null);
      setErrors({ ...errors, doctor: true });
    }
  };

  const handleCategoryChange = (e) => {
    setTouched({ ...touched, category: true });
    const selectedCategory = categories.find(
      (cat) => cat.ApponmentCategoryID === e.target.value
    );
    setCategory(selectedCategory);
    setErrors({ ...errors, category: !selectedCategory });
  };
  
  const handleServiceChange = (event, value) => {
    setTouched({ ...touched, service: true });
    if (value) {
      setService(value);
      setErrors({ ...errors, service: false });
    } else {
      setService(null);
      setErrors({ ...errors, service: true });
    }
  };

  const handleStartDateChange = (newValue) => {
    setTouched({ ...touched, date: true, startTime: true });
    setStartDate(newValue);
    setErrors({ 
      ...errors, 
      date: !newValue,
      startTime: !newValue,
      // Also update endTime validation if end time is now invalid
      endTime: touched.endTime && (!endDate || endDate <= newValue)
    });
    
    // Ensure end date is also updated if necessary
    if (!endDate || endDate <= newValue) {
      const newEndDate = new Date(newValue);
      newEndDate.setMinutes(newEndDate.getMinutes() + 30);
      setEndDate(newEndDate);
    }
  };
  
  const handleEndDateChange = (newValue) => {
    setTouched({ ...touched, endTime: true });
    setEndDate(newValue);
    setErrors({ 
      ...errors, 
      endTime: !newValue || (startDate && newValue <= startDate)
    });
  };

  const handleClose = () => {
    setOpen(false);
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedPatient(null);
    setSelectedDoctor(null);
    setErrors({
      patient: false,
      doctor: false,
      service: false,
      category: false,
      date: false,
      startTime: false,
      endTime: false,
    });
    setTouched({
      patient: false,
      doctor: false,
      service: false,
      category: false,
      date: false,
      startTime: false,
      endTime: false,
    });
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
            <div className="flex gap-4">
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-3">Patient<span className="text-red-500">*</span></h1>
                <Autocomplete
                  sx={{ margin: "0" }}
                  fullWidth
                  freeSolo
                  options={patients}
                  getOptionLabel={(option) =>
                    `${option.FirstName} ${option.LastName}`
                  }
                  onChange={handlePatientSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="Patient"
                      variant="outlined"
                      error={touched.patient && errors.patient}
                      helperText={touched.patient && errors.patient ? "Patient is required" : ""}
                    />
                  )}
                  renderOption={(props, option) => (
                    <>
                      <MenuItem {...props} key={option.id}>
                        {`${option.FirstName} ${option.LastName}`}
                      </MenuItem>
                    </>
                  )}
                />
              </div>

              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-3">Doctor<span className="text-red-500">*</span></h1>
                <Autocomplete
                  sx={{ margin: "0" }}
                  fullWidth
                  freeSolo
                  options={doctors}
                  getOptionLabel={(option) => `${option.userName}`}
                  onChange={handleDoctorSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="Doctor"
                      variant="outlined"
                      error={touched.doctor && errors.doctor}
                      helperText={touched.doctor && errors.doctor ? "Doctor is required" : ""}
                    />
                  )}
                  renderOption={(props, option) => (
                    <>
                      <MenuItem {...props} key={option.id}>
                        {`${option.userName}`}
                      </MenuItem>
                    </>
                  )}
                />
              </div>
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
                  value={selectedPatient ? selectedPatient.Address : ""}
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
                  value={selectedPatient ? selectedPatient.PatientID : ""}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-3">Service<span className="text-red-500">*</span></h1>
                <Autocomplete
                  sx={{ margin: "0" }}
                  fullWidth
                  freeSolo
                  options={services}
                  getOptionLabel={(option) => option.name}
                  onChange={handleServiceChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="Service"
                      variant="outlined"
                      error={touched.service && errors.service}
                      helperText={touched.service && errors.service ? "Service is required" : ""}
                    />
                  )}
                  renderOption={(props, option) => (
                    <>
                      <MenuItem {...props} key={option.id}>
                        {option.name}
                      </MenuItem>
                    </>
                  )}
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
                  value={selectedPatient ? selectedPatient.Email : ""}
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
                  value={selectedPatient ? selectedPatient.PhoneNum : ""}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-3">Category<span className="text-red-500">*</span></h1>
                <FormControl 
                  fullWidth
                  error={touched.category && errors.category}
                >
                  <Select
                    className="w-full"
                    name="category"
                    hiddenLabel
                    value={category?.ApponmentCategoryID || ""}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        value={category.ApponmentCategoryID}
                        key={category.ApponmentCategoryID}
                      >
                        {category.NameCategory}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.category && errors.category && (
                    <FormHelperText>Category is required</FormHelperText>
                  )}
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
                      ? selectedPatient.Sex == "F"
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
                  <h1 className="text-base font-medium">Select Date<span className="text-red-500">*</span></h1>
                  <DatePicker
                    fullWidth
                    placeholder="Select Date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                        error: touched.date && errors.date,
                        helperText: touched.date && errors.date ? "Date is required" : "",
                      },
                    }}
                  />
                </div>

                <div className="w-full flex flex-col gap-3">
                  <h1 className="font-medium text-base">Start Time<span className="text-red-500">*</span></h1>
                  <TimePicker
                    fullWidth
                    placeholder="Start Time"
                    value={startDate}
                    onChange={handleStartDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                        error: touched.startTime && errors.startTime,
                        helperText: touched.startTime && errors.startTime ? "Start time is required" : "",
                      },
                    }}
                  />
                </div>
                <div className="w-full flex flex-col gap-3">
                  <h1 className="font-medium text-base">End Time<span className="text-red-500">*</span></h1>
                  <TimePicker
                    fullWidth
                    placeholder="End Time"
                    value={endDate}
                    onChange={handleEndDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                        error: touched.endTime && errors.endTime,
                        helperText: touched.endTime && errors.endTime 
                          ? endDate && startDate && endDate <= startDate 
                            ? "End time must be after start time" 
                            : "End time is required" 
                          : "",
                      },
                    }}
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