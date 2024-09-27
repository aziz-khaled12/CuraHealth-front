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

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      const isExpired = isTokenExpired(accessToken);
      if (isExpired) {
        dispatch(autoLogout());
      }
    }
  }, [dispatch, accessToken]);



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
