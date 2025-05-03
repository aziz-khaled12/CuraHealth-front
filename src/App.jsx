import { useEffect, useRef } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { autoLogout, isTokenExpired } from "./redux/authSlice";
import PortectedRoutes from "./utils/PortectedRoutes";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Calendar from "./components/calendar/Calendar";
import Appointments from "./components/appointments/Appointments";
import Patients from "./components/patients/Patients";
import Services from "./components/services/Services";
import Office from "./components/office/main/Office";
import Rapports from "./components/random/Rapports";
import "./App.css";
import PatientDetails from "./components/patients/patientsUtils/PatientDetails";
import PatientRecords from "./components/medicalHistory/PatientRecords";
import SessionsPage from "./components/sessions/main/SessionsPage";
import { fetchVitals } from "./redux/signsSlice";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Unauthorized from "./components/layout/Unauthorized";
import Profile from "./components/profile/profile";
import UsersManagement from "./components/user-management/UsersManagement";
import Test from "./Test";
import Layout from "./components/layout/Layout";
import { jwtDecode } from "jwt-decode";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const logoutTimerRef = useRef(null);

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#0D3B66",
        contrastText: "#FFFFFF",
      },
    },
  });

  useEffect(() => {
    const setLogoutTimer = () => {
      if (!accessToken) {
        dispatch(autoLogout());
        return;
      }

      const isExpired = isTokenExpired(accessToken);
      if (isExpired) {
        dispatch(autoLogout());
        return;
      }

      const decodedToken = jwtDecode(accessToken);
      const expiresIn = decodedToken.exp * 1000 - Date.now();

      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }

      logoutTimerRef.current = setTimeout(() => {
        dispatch(autoLogout());
      }, expiresIn);
    };

    setLogoutTimer();

    // Cleanup on unmount or token change
    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [accessToken, dispatch]);

  useEffect(() => {
    dispatch(fetchVitals());
  }, [dispatch]);

  return (
    <div>
      <div
        id="pdf-container"
        className="hidden print:block absolute top-0 left-0 bg-white w-[794px] min-h-[1123px]"
      >
        {/* React will render into here when needed */}
      </div>{" "}
      <ThemeProvider theme={customTheme}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PortectedRoutes />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<PatientDetails />} />
              <Route path="patients/:id/records" element={<PatientRecords />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="services" element={<Services />} />
              <Route path="rapports" element={<Rapports />} />
              <Route path="office" element={<Office />} />
              <Route path="office/sessions" element={<SessionsPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="users-management" element={<UsersManagement />} />
            </Route>
          </Route>
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
