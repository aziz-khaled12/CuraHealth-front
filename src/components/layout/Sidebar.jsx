import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import {
  MdPersonalInjury,
  MdCalendarMonth,
  MdMedicalServices,
  MdAssignment,
} from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { PiStethoscopeBold } from "react-icons/pi";
import { FaUserInjured } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const menuItems = [
    {
      id: 0,
      label: "Dashboard",
      icon: <BiSolidDashboard size={22} />,
      link: "dashboard",
    },
    {
      id: 1,
      label: "Patients",
      icon: <FaUserInjured size={20} />,
      link: "patients",
    },
    {
      id: 2,
      label: "Appointments",
      icon: <MdCalendarMonth size={22} />,
      link: "appointments",
    },
    {
      id: 3,
      label: "Reports",
      icon: <MdAssignment size={22} />,
      link: "rapports",
    },
    {
      id: 4,
      label: "Services",
      icon: <MdMedicalServices size={22} />,
      link: "services",
    },
    {
      id: 5,
      label: "Calendar",
      icon: <MdCalendarMonth size={22} />,
      link: "calendar",
    },
    {
      id: 6,
      label: "Office",
      icon: <PiStethoscopeBold size={22} />,
      link: "office",
    },
  ];

  useEffect(() => {
    const matchedTab = menuItems.find((tab) =>
      location.pathname.startsWith(`/${tab.link}`)
    );
    if (matchedTab) setSelected(matchedTab.id);
  }, [location.pathname]);

  console.log("rerendered")

  return (
    <div
      className={`h-full bg-white shadow-md flex flex-col py-4 relative transition-all duration-300 
    w-[80px]`}
    >
      {/* Logo */}
      {/* <div className="flex justify-center items-center mb-8">
        {expanded ? (
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="ml-2 text-lg font-semibold text-blue-600 whitespace-nowrap">MediPortal</span>
          </div>
        ) : (
          <img src={logo} alt="Logo" className="h-10 w-10" />
        )}
      </div> */}

      {/* Navigation Items */}
      <div className="flex flex-col gap-2 px-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-lg overflow-hidden ${
              selected === item.id ? "bg-blue-50" : ""
            }`}
          >
            {/* Active indicator */}
            {selected === item.id && (
              <div className="absolute left-0 top-0 h-full w-1 bg-primary"></div>
            )}

            <Tooltip title={item.label} placement="right">
              <button
                onClick={() => navigate(`/${item.link}`)}
                className={`flex items-center w-full py-3 px-3 transition-all
                  ${
                    selected === item.id
                      ? "text-primary font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <span className="flex justify-center items-center min-w-[30px]">
                  {item.icon}
                </span>
              </button>
            </Tooltip>
          </div>
        ))}
      </div>

      {/* User Profile at Bottom */}
      <div className="mt-auto mx-3 pt-4 border-t border-gray-200">
        <Tooltip title={"Profile"} placement="right">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center w-full rounded-lg py-2 px-3 text-gray-600 hover:bg-gray-100"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
              DR
            </div>
          
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
