import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PortectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PortectedRoutes;
