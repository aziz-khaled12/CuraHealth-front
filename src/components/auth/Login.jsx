import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import { MoonLoader } from "react-spinners";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();
  const { error, authStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("error: ", error);
  }, [error]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (prevData[name] === value) return prevData;
      return { ...prevData, [name]: value };
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!formData.email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!formData.password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      dispatch(login({ email: formData.email, password: formData.password }));
    }
  };



  return (
    <Box
      className="w-full min-h-screen flex items-center justify-center bg-lightBg"
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
      }}
    >
      <Paper
        elevation={8}
        className="w-full max-w-md mx-auto rounded-xl overflow-hidden"
        sx={{
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Box className="p-8 bg-white">
          <Box className="mb-8 text-center">
            <Typography
              variant="overline"
              className="text-primary font-bold tracking-widest"
              sx={{ letterSpacing: "0.15em" }}
            >
              WELCOME BACK
            </Typography>
            <Typography
              variant="h4"
              className="font-bold mt-2"
              sx={{ fontWeight: 600 }}
            >
              Log In to your Account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box className="space-y-6">
              <TextField
                fullWidth
                type="email"
                error={Boolean(emailError)}
                helperText={emailError}
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />

              <TextField
                fullWidth
                error={Boolean(passwordError)}
                helperText={passwordError}
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  "& input::-ms-reveal, & input::-ms-clear": {
                    display: "none",
                  },
                }}
              />

              {error && error.length > 0 && (
                <Alert
                  variant="outlined"
                  severity="error"
                  sx={{ borderRadius: "8px" }}
                >
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disableElevation
                className="!bg-primary"
                sx={{
                  borderRadius: "10px",
                  padding: "12px 0",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {authStatus === "loading" ? (
                  <MoonLoader
                    color="#ffffff"
                    loading
                    size={22}
                    speedMultiplier={1}
                  />
                ) : (
                  "Sign in"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
