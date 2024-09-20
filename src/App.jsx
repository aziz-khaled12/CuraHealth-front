import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Page from "./components/Page";
import Login from "./components/Login";
import PortectedRoutes from "./utils/PortectedRoutes";
import Signup from "./components/Signup";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {

  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PortectedRoutes />}>
            <Route path="/" element={<Layout />} />
            <Route path="/page" element={<Page />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
