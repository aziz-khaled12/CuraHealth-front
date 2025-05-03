import React from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();
  const isCalendarPage = location.pathname === "/calendar";
  const isSessionsPage = location.pathname === "/office/sessions";

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
    <div className="w-full flex-shrink-0 z-10">
      <Navbar />
    </div>

    <div className="w-full flex flex-1 overflow-hidden">
      <div className="flex-shrink-0 h-full overflow-y-auto">
        <Sidebar />
      </div>

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

export default Layout;
