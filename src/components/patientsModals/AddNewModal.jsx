import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addPatient } from "../../redux/patientsSlice";
import { fetchBloodTypes, fetchEtatCivil } from "../../redux/userDataSlice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const AddNewModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: new Date(),
    phoneNum: "",
    IDNum: "", //National Identity card number
    email: "",
    BloodTypeID: 0,
    EtatCivileID: 0,
    sex: 2,
    address: "",
    city: "",
    age: 0,
  });



  const { bloodTypes, etatsCivil } = useSelector((state) => state.userData);

  const genders = [
    { id: 'M', name: "Male" },
    { id: 'F', name: "Femal" },
  ];

  useEffect(() => {
    dispatch(fetchBloodTypes());
    dispatch(fetchEtatCivil());
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the field by name
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      ...formData,
    };
    
    dispatch(addPatient({patientData: dataToSubmit}))
    handleClose()
  }
  return (
    <div>
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
          <h2 className="mb-10 text-2xl font-semibold">Add Patient</h2>
          <div className="flex flex-col gap-5 items-start w-full">
            <div className="flex gap-5 w-full">
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-2">First Name</h1>
                <TextField
                  className="w-full"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="First Name"
                  value={formData.firstName}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-2">Last Name</h1>
                <TextField
                  className="w-full"
                  onChange={handleChange}
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <h1 className="text-base font-medium mb-2">Birthday</h1>
                  <DatePicker
                    sx={{ width: "100%" }}
                    placeholder="Select Date"
                    onChange={(newValue) => setFormData((prevState) => ({...prevState, birthday: newValue}))}
                      


                    name="birthday"
                    value={formData.birthday}
                    renderInput={(params) => (
                      <TextField sx={{ width: "100%" }} {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="flex w-full gap-5">
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-2">Phone Number</h1>
                <TextField
                  className="w-full"
                  name="phoneNum"
                  onChange={handleChange}
                  placeholder="Phone Number"
                  value={formData.phoneNum}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-2">
                  National Identification Number
                </h1>
                <TextField
                  className="w-full"
                  name="IDNum"
                  onChange={handleChange}
                  placeholder="National ID"
                  value={formData.IDNum}
                />
              </div>
            </div>

            <div className="w-full flex gap-5">
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-2">Email</h1>
                <TextField
                  className="w-full"
                  onChange={handleChange}
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                />
              </div>

              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-2">Blood Type</h1>
                <FormControl fullWidth>
                  <Select
                    className="w-full"
                    name="BloodTypeID"
                    hiddenLabel
                    onChange={handleChange}
                    value={formData.BloodTypeID}
                  >
                    <MenuItem value={0}>
                      <em>Select a blood type</em>
                    </MenuItem>
                    {bloodTypes.map((bloodType, index) => {
                      return (
                        <MenuItem value={bloodType.BloodTypeID} key={index}>
                          {bloodType.NameBloodType}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-2">Etat Civile</h1>
                <FormControl fullWidth>
                  <Select
                    className="w-full"
                    name="EtatCivileID"
                    placeholder="Married, Single..."
                    onChange={handleChange}
                    displayEmpty
                    value={formData.EtatCivileID}
                  >
                    <MenuItem value={0}>
                      <em>Select an Etat Civil</em>
                    </MenuItem>
                    {etatsCivil.map((etatCivil, index) => {
                      return (
                        <MenuItem value={etatCivil.EtatCivileID} key={index}>
                          {etatCivil.NameEtatCivile}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-2">Sex</h1>
                <FormControl fullWidth>
                  <Select
                    className="w-full"
                    name="sex"
                    onChange={handleChange}
                    hiddenLabel
                    value={formData.sex}
                  >
                    <MenuItem value={2}>
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
                </FormControl>
              </div>
            </div>

            <div className="w-full flex gap-5">
            <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-2">Address</h1>
                <TextField
                  className="w-full"
                  onChange={handleChange}
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-medium mb-2">City</h1>
                <TextField
                  className="w-full"
                  onChange={handleChange}
                  name="city"
                  placeholder="City"
                  value={formData.city}
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
            Add Patient
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddNewModal;
