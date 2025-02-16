import React from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isCalendarPage = location.pathname === "/calendar";
  const isSessionsPage = location.pathname === "/office/sessions";

  return (
    <div className="w-full h-screen flex">
      <div className="h-full flex-grow overflow-hidden">
        <Sidebar />
      </div>

        <main
          className={`flex-grow w-full bg-lightBg ${
            isCalendarPage || isSessionsPage ? "p-0" : "p-8"
          } overflow-auto custom-scrollbar`}
        >
          <Outlet />
        </main>

    </div>
  );
};

export default Layout;
