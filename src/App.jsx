import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Page from "./components/Page";
import Login from "./components/Login";
import PortectedRoutes from "./utils/PortectedRoutes";
import Signup from "./components/Signup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/layout/Layout";
import { autoLogout, isTokenExpired } from "./redux/authSlice";
import Appointments from "./components/appointments/Appointments";
import Dashboard from "./components/Dashboard";
import Patients from "./components/patients/Patients";
import Rapports from "./components/Rapports";
import Services from "./components/services/Services";
import Calendar from "./components/calendar/Calendar";
import PatientDetails from "./components/patients/PatientDetails";
import Office from "./components/office/Office";
import Test from "./components/Test";


function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);

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
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
          {/* <Route element={<PortectedRoutes />}> */}

            <Route path="/" element={<Layout />} > 
              <Route path="calendar" element={<Calendar />}/>
              <Route path="patients" element={<Patients />}/>
              <Route path="patients/:id" element={<PatientDetails />}/>
              <Route path="appointments" element={<Appointments />}/>
              <Route path="dashboard" element={<Dashboard />}/>
              <Route path="services" element={<Services />}/>
              <Route path="rapports" element={<Rapports />}/>
              <Route path="office" element={<Office />}/>
            </Route>

            <Route path="/page" element={<Page />} />
            <Route path="/test" element={<Test />} />
          {/* </Route> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
