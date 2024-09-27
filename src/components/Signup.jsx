import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../redux/authSlice";
import { fetchTypes } from "../redux/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginBg from "../assets/login.jpg";
 
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, authStatus } = useSelector(
    (state) => state.auth
  );

  const { types, userDataStatus } = useSelector((state) => state.userData);

  useEffect(() => {
    console.log(types);
    console.log(userDataStatus);
  }, [types, userDataStatus]);

  useEffect(() => {
    // Dispatch the fetchTypes action
    dispatch(fetchTypes());
  }, []);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    TypeID: "",
    confirmPassword: "",
  });

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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

    if (!formData.confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      await dispatch(
        signup({
          Email: formData.email,
          Password: formData.password,
          Name: formData.userName,
          TypeID: formData.TypeID,
        })
      );
    }
  };

  useEffect(() => {
    if (authStatus === "success" && isAuthenticated) {
      navigate("/");
    }
  }, [authStatus, isAuthenticated]);

  return (
    <div className="w-full min-h-screen flex items-center justify-between">
      <div className="w-[55%]">
        <img
          src={LoginBg}
          alt="login background"
          className="w-auto h-full max-h-screen"
        />
      </div>
      <div className="flex w-[45%] justify-center items-center flex-col">
        <form
          className="w-[460px] p-6 rounded-3xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-8">
            <Typography variant="overline" display="block" gutterBottom>
              LET'S GET YOU STARTED
            </Typography>
            <Typography variant="h5" gutterBottom>
              Create an account
            </Typography>
          </div>
          <div className="w-full mb-4">
            <TextField
              error={Boolean(userNameError)}
              helperText={userNameError}
              className="w-full"
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              sx={{ height: "45px" }}
            />
          </div>
          <div className="w-full mb-4">
            <TextField
              error={Boolean(emailError)}
              helperText={emailError}
              className="w-full"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ height: "45px" }}
            />
          </div>
          <div className="w-full mb-4">
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
                  {types.map((type, index) => {
                    return (
                      <MenuItem key={index} value={type.TypeID}>
                        {type.NameType}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>{roleError}</FormHelperText>
              </FormControl>
            )}
          </div>
          <div className="w-full mb-4">
            <TextField
              error={Boolean(passwordError)}
              helperText={passwordError}
              className="w-full"
              id="outlined-basic"
              label="Password"
              sx={{ height: "45px" }}
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full mb-4">
            <TextField
              error={Boolean(confirmPasswordError)}
              helperText={confirmPasswordError}
              className="w-full"
              id="outlined-basic"
              label="Confirm Password"
              sx={{ height: "45px" }}
              type="password"
              variant="outlined"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {error && error.length ? (
            <Alert variant="outlined" severity="error" className="!mb-4">
              {error}
            </Alert>
          ) : (
            ""
          )}
          <Button
            type="submit"
            variant="contained"
            className="!bg-primary !rounded-lg !p-4 w-full !normal-case"
            sx={{ height: "45px" }}
          >
            GET STARTED
          </Button>

          <div className="flex w-full justify-between items-center my-4">
            <div className="w-[40%] h-[1px] bg-secondary"></div>
            Or
            <div className="w-[40%] h-[1px] bg-secondary"></div>
          </div>

          <div className="w-full">
            <Button
              type="button"
              variant="contained"
              sx={{ height: "45px" }}
              className="!bg-white !text-darkText !rounded-lg !p-3 !mb-4 w-full !normal-case"
            >
              <FcGoogle className="absolute left-5 text-xl" /> Sign up with
              Google
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ height: "45px" }}
              className="!bg-white !text-darkText !rounded-lg !p-3 !mb-4 w-full !normal-case"
            >
              <FaFacebook className="text-blue-800 absolute left-5 text-xl" />
              Sign up with Facebook
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ height: "45px" }}
              className="!bg-white !text-darkText !rounded-lg !p-3 !mb-4 w-full !normal-case"
            >
              <FaApple className="absolute left-5 text-xl" />
              Sign up with Apple
            </Button>
          </div>
          <div className="flex items-center justify-center w-full">
            <Typography variant="subtitle2" display="block" gutterBottom>
              Already have an account?{" "}
              <Link className="font-bold" to={"/login"}>
                Login
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
