import { useEffect } from "react";
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
import Dashboard from "./components/random/Dashboard";
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

const DashboardLayout = () => {
  const location = useLocation();
  const isCalendarPage = location.pathname === "/calendar";
  const isSessionsPage = location.pathname === "/office/sessions";

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Navbar - fixed height */}
      <div className="w-full flex-shrink-0 z-10">
        <Navbar />
      </div>

      {/* Content area - takes remaining height */}
      <div className="w-full flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 h-full overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main content */}
        <main
          className={`flex-grow h-full ${
            isCalendarPage || isSessionsPage ? "p-0" : "p-8"
          } overflow-y-auto  bg-lightBg custom-scrollbar`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#0D3B66",
        contrastText: "#FFFFFF",
      },
    },
  });

  useEffect(() => {
    if (accessToken) {
      const isExpired = isTokenExpired(accessToken);
      if (isExpired) {
        dispatch(autoLogout());
      }
    } else {
      dispatch(autoLogout());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    dispatch(fetchVitals());
  }, [dispatch]);

  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes with shared layout */}
          <Route element={<PortectedRoutes />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<PatientDetails />} />
              <Route path="patients/:id/records" element={<PatientRecords />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="dashboard" element={<Dashboard />} />
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
