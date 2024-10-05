import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  // Check if the current route is the calendar route to adjust padding
  const isCalendarPage = location.pathname === '/calendar';
  useEffect(() => {
    console.log(isCalendarPage)
  }, [isCalendarPage])
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex flex-grow w-full overflow-hidden">
        <div className="h-full flex-grow overflow-hidden">
          <Sidebar />
        </div>
        <main
          className={`flex-grow w-full bg-lightBg ${isCalendarPage ? 'p-0' : 'p-8'} overflow-auto custom-scrollbar`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
