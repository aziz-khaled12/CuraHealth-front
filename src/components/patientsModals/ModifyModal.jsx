import React, { useEffect, useState } from "react";
import { fetchBloodTypes, fetchEtatCivil } from "../../redux/userDataSlice";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { updatePatient } from "../../redux/patientsSlice";
import { showAlert } from "../../redux/alertSlice";
import { FaTimes } from "react-icons/fa";

const ModifyModal = ({ open, setOpen, patientId }) => {
  const prevData = useSelector((state) =>
    state.patients.patients.filter((patient) => patient.PatientID === patientId)
  );

  const { patientStatus, error } = useSelector((state) => state.patients);

  console.log("prevData", prevData);

  const dispatch = useDispatch();
  const genders = [
    { id: "M", name: "Male" },
    { id: "F", name: "Female" },
  ];

  const [formData, setFormData] = useState(prevData[0] || {});
  const [updateData, setUpdateData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    dispatch(fetchBloodTypes());
    dispatch(fetchEtatCivil());
  }, [dispatch]);

  const { bloodTypes, etatsCivil } = useSelector((state) => state.userData);

  // Validation functions
  const validateName = (name) => {
    if (!name || name.trim().length === 0) {
      return "This field is required";
    }
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name.trim())) {
      return "Name must contain only letters, spaces, hyphens, and apostrophes";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    if (name.trim().length > 50) {
      return "Name must be less than 50 characters";
    }
    return "";
  };

  const validatePhoneNumber = (phone) => {
    if (!phone || phone.trim().length === 0) {
      return "Phone number is required";
    }
    // Remove spaces, dashes, and parentheses for validation
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    if (!/^(\+213|0)[0-9]{9}$/.test(cleanPhone)) {
      return "Please enter a valid Algerian phone number (e.g., +213XXXXXXXXX or 0XXXXXXXXX)";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email || email.trim().length === 0) {
      return "Email is required";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateBirthday = (birthday) => {
    if (!birthday) {
      return "Birthday is required";
    }
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (birthDate > today) {
      return "Birthday cannot be in the future";
    }
    if (age > 150 || (age === 150 && monthDiff > 0)) {
      return "Please enter a valid birth date";
    }
    return "";
  };

  const validateAddress = (address) => {
    if (!address || address.trim().length === 0) {
      return "Address is required";
    }
    if (address.trim().length < 5) {
      return "Address must be at least 5 characters long";
    }
    if (address.trim().length > 200) {
      return "Address must be less than 200 characters";
    }
    return "";
  };

  const validateCity = (city) => {
    if (!city || city.trim().length === 0) {
      return "City is required";
    }
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(city.trim())) {
      return "City must contain only letters, spaces, hyphens, and apostrophes";
    }
    if (city.trim().length < 2) {
      return "City must be at least 2 characters long";
    }
    if (city.trim().length > 50) {
      return "City must be less than 50 characters";
    }
    return "";
  };

  const validateSelect = (value, fieldName) => {
    if (!value || value === 0 || value === "") {
      return `Please select a ${fieldName}`;
    }
    return "";
  };

  // Validate all fields
  const validateField = (name, value) => {
    switch (name) {
      case "FirstName":
        return validateName(value);
      case "LastName":
        return validateName(value);
      case "PhoneNum":
        return validatePhoneNumber(value);
      case "Email":
        return validateEmail(value);
      case "BirthDay":
        return validateBirthday(value);
      case "Address":
        return validateAddress(value);
      case "City":
        return validateCity(value);
      case "BloodTypeID":
        return validateSelect(value, "blood type");
      case "EtatCivileID":
        return validateSelect(value, "marital status");
      case "Sex":
        return validateSelect(value, "gender");
      default:
        return "";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("name", name, "value", value);

    // Update form data
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Mark field as touched
    setTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));

    // Validate field
    const error = validateField(name, value);
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleDateChange = (newValue) => {
    const name = "BirthDay";

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    setUpdateData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    // Mark field as touched
    setTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));

    // Validate field
    const error = validateField(name, newValue);
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    // Reset validation states
    setErrors({});
    setTouched({});
  };

  const validateAllFields = () => {
    const fieldsToValidate = [
      "FirstName",
      "LastName",
      "PhoneNum",
      "Email",
      "BirthDay",
      "Address",
      "City",
      "BloodTypeID",
      "EtatCivileID",
      "Sex",
    ];

    const newErrors = {};
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateAllFields()) {
      dispatch(
        showAlert({
          severity: "error",
          message: "Please fix all validation errors before submitting",
        })
      );
      return;
    }

    await dispatch(updatePatient({ updateData, patientId }));
    if (patientStatus === "success") {
      dispatch(
        showAlert({
          severity: "success",
          message: "Patient modified successfully",
        })
      );
      handleClose();
    } else if (patientStatus === "failed") {
      dispatch(showAlert({ severity: "error", message: error }));
    }
  };

  useEffect(() => {
    console.log("updateData: ", updateData);
  }, [updateData]);

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
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="w-full flex items-center justify-between mb-10">
          <h2 className=" text-2xl font-semibold">Modify Patient</h2>
          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-primary transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-5 items-start w-full">
          <div className="flex gap-5 w-full">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-2">First Name *</h1>
              <TextField
                className="w-full"
                name="FirstName"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First Name"
                value={formData.FirstName || ""}
                error={touched.FirstName && !!errors.FirstName}
                helperText={touched.FirstName && errors.FirstName}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-2">Last Name *</h1>
              <TextField
                className="w-full"
                onChange={handleChange}
                onBlur={handleBlur}
                name="LastName"
                placeholder="Last Name"
                value={formData.LastName || ""}
                error={touched.LastName && !!errors.LastName}
                helperText={touched.LastName && errors.LastName}
              />
            </div>
          </div>

          <div className="flex w-full gap-5">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-2">Phone Number *</h1>
              <TextField
                className="w-full"
                name="PhoneNum"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Phone Number (e.g., +213XXXXXXXXX)"
                value={formData.PhoneNum || ""}
                error={touched.PhoneNum && !!errors.PhoneNum}
                helperText={touched.PhoneNum && errors.PhoneNum}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <h1 className="text-base font-medium mb-2">Birthday *</h1>
                <DatePicker
                  sx={{ width: "100%" }}
                  placeholder="Select Date"
                  onChange={handleDateChange}
                  name="BirthDay"
                  value={formData.BirthDay ? new Date(formData.BirthDay) : null}
                  slotProps={{
                    textField: {
                      error: touched.BirthDay && !!errors.BirthDay,
                      helperText: touched.BirthDay && errors.BirthDay,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "100%" }}
                      {...params}
                      error={touched.BirthDay && !!errors.BirthDay}
                      helperText={touched.BirthDay && errors.BirthDay}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className="w-full flex gap-5">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-2">Email *</h1>
              <TextField
                className="w-full"
                onChange={handleChange}
                onBlur={handleBlur}
                name="Email"
                placeholder="Email"
                value={formData.Email || ""}
                error={touched.Email && !!errors.Email}
                helperText={touched.Email && errors.Email}
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-2">Blood Type *</h1>
              <FormControl
                fullWidth
                error={touched.BloodTypeID && !!errors.BloodTypeID}
              >
                <Select
                  className="w-full"
                  name="BloodTypeID"
                  hiddenLabel
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.BloodTypeID || 0}
                >
                  <MenuItem value={0}>
                    <em>Select a blood type</em>
                  </MenuItem>
                  {bloodTypes?.map((bloodType, index) => {
                    return (
                      <MenuItem value={bloodType.BloodTypeID} key={index}>
                        {bloodType.NameBloodType}
                      </MenuItem>
                    );
                  })}
                </Select>
                {touched.BloodTypeID && errors.BloodTypeID && (
                  <FormHelperText>{errors.BloodTypeID}</FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-2">Marital Status *</h1>
              <FormControl
                fullWidth
                error={touched.EtatCivileID && !!errors.EtatCivileID}
              >
                <Select
                  className="w-full"
                  name="EtatCivileID"
                  placeholder="Married, Single..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  displayEmpty
                  value={formData.EtatCivileID || 0}
                >
                  <MenuItem value={0}>
                    <em>Select Marital Status</em>
                  </MenuItem>
                  {etatsCivil?.map((etatCivil, index) => {
                    return (
                      <MenuItem value={etatCivil.EtatCivileID} key={index}>
                        {etatCivil.NameEtatCivile}
                      </MenuItem>
                    );
                  })}
                </Select>
                {touched.EtatCivileID && errors.EtatCivileID && (
                  <FormHelperText>{errors.EtatCivileID}</FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-2">Gender *</h1>
              <FormControl fullWidth error={touched.Sex && !!errors.Sex}>
                <Select
                  className="w-full"
                  name="Sex"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  hiddenLabel
                  value={formData.Sex || ""}
                >
                  <MenuItem value="">
                    <em>Select a Gender</em>
                  </MenuItem>
                  {genders.map((gender, index) => {
                    return (
                      <MenuItem value={gender.id} key={index}>
                        {gender.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {touched.Sex && errors.Sex && (
                  <FormHelperText>{errors.Sex}</FormHelperText>
                )}
              </FormControl>
            </div>
          </div>

          <div className="w-full flex gap-5">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-2">Address *</h1>
              <TextField
                className="w-full"
                onChange={handleChange}
                onBlur={handleBlur}
                name="Address"
                placeholder="Address"
                value={formData.Address || ""}
                error={touched.Address && !!errors.Address}
                helperText={touched.Address && errors.Address}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="text-base font-medium mb-2">City *</h1>
              <TextField
                className="w-full"
                onChange={handleChange}
                onBlur={handleBlur}
                name="City"
                placeholder="City"
                value={formData.City || ""}
                error={touched.City && !!errors.City}
                helperText={touched.City && errors.City}
              />
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          className="!bg-primary"
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 2,
            textTransform: "none",
            height: "45px",
            fontSize: "22",
            fontWeight: "500",
          }}
        >
          Modify Patient
        </Button>
      </Box>
    </Modal>
  );
};

export default ModifyModal;
