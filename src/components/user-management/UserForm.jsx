import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Alert,
} from "@mui/material";
import { register } from "../../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { showAlert } from "../../redux/alertSlice";

const UserForm = ({ user, onCancel, types }) => {
  const dispatch = useDispatch();
  const { usersStatus, error } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    TypeID: user ? user.TypeID : types[0].TypeID,
    password: "",
  });

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setFormData({ ...user, password: "" });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!formData.userName) {
      setUserNameError("User name is required");
      isValid = false;
    } else {
      setUserNameError("");
    }

    if (!formData.email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!formData.TypeID) {
      setRoleError("Role is required");
      isValid = false;
    } else {
      setRoleError("");
    }
    if (!formData.password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      dispatch(
        register({
          Email: formData.email,
          Password: formData.password,
          Name: formData.userName,
          TypeID: formData.TypeID,
        })
      );
    }

    if (usersStatus === "success") {
      dispatch(
        showAlert({ message: "User added succefuly", severity: "success" })
      );
      onCancel();
    }
  };

  useEffect(() => {
    if (error && error.length > 0 && error.includes("idx_users_email")) {
      setEmailError("This email is already used");
    }
  });

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(emailError)}
            helperText={emailError}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            error={Boolean(userNameError)}
            helperText={userNameError}
            margin="normal"
          />
          {!user && (
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(passwordError)}
              helperText={passwordError}
              margin="normal"
            />
          )}
          {types && (
            <FormControl
              className="!w-full"
              error={Boolean(roleError)}
              sx={{ height: "45px" }}
            >
              <InputLabel id="demo-simple-select-required-label">
                Type
              </InputLabel>
              <Select
                className="!w-full"
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={formData.TypeID}
                name="TypeID"
                label="Role"
                onChange={handleChange}
                sx={{ height: "55px" }}
              >
                <MenuItem value="">Select a role</MenuItem>
                {types.map((type, index) => (
                  <MenuItem key={index} value={type.TypeID}>
                    {type.NameType}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{roleError}</FormHelperText>
            </FormControl>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: "90px" }}
        >
          {usersStatus === "loading" ? (
            <MoonLoader color="#ffffff" loading size={18} speedMultiplier={1} />
          ) : user ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
