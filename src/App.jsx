import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { autoLogout, isTokenExpired } from "./redux/authSlice";
import PortectedRoutes from "./utils/PortectedRoutes";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Calendar from "./components/calendar/Calendar";
import Layout from "./components/layout/Layout";
import Appointments from "./components/appointments/Appointments";
import Patients from "./components/patients/Patients";
import PatientDetails from "./components/patients/PatientDetails";
import Services from "./components/services/Services";
import Office from "./components/office/Office";
import Dashboard from "./components/Dashboard";
import Rapports from "./components/Rapports";
import "./App.css";
import SessionsPage from "./components/office/SessionsPage";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#0D3B66", // Your custom primary color
        contrastText: "#FFFFFF", // Text color on primary background
      },
    },
  });

  // useEffect(() => {
  //   if (accessToken) {
  //     const isExpired = isTokenExpired(accessToken);
  //     if (isExpired) {
  //       dispatch(autoLogout());
  //     }
  //   }
  // }, [dispatch, accessToken]);

  return (
    <>
      <div>
        <ThemeProvider theme={customTheme}>
          <Routes>
            <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
            {/* <Route element={<PortectedRoutes />}> */}
            <Route path="/" element={<Layout />}>
              <Route path="calendar" element={<Calendar />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<PatientDetails />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="services" element={<Services />} />
              <Route path="rapports" element={<Rapports />} />
              <Route path="office" element={<Office />} />
              <Route path="/office/sessions" element={<SessionsPage />} />
              {/* <Route path="test" element={<TestNav />} /> */}
            </Route>

            {/* </Route> */}
          </Routes>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
