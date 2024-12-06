import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { MdPersonalInjury, MdCalendarMonth, MdClose } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { PiStethoscopeBold } from "react-icons/pi";

const Sidebar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState();
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      navigate("/dashboard");
      setSelected(0);
    }
    const matchedTab = menuItems.find((tab) => {
      return currentPath.startsWith(`/${tab.link}`);
    });

    if (matchedTab && matchedTab.id !== selected) {
      setSelected(matchedTab.id);
    }
  }, [selected, location.pathname]);

  const menuItems = [
    {
      id: 0,
      label: "Dashboard",
      icon: <BiSolidDashboard />,
      link: "dashboard",
    },
    { id: 1, label: "Patients", icon: <MdPersonalInjury />, link: "patients" },
    {
      id: 2,
      label: "Appointments",
      icon: <MdCalendarMonth />,
      link: "appointments",
    },
    { id: 3, label: "Rapports", icon: <MdPersonalInjury />, link: "rapports" },
    {
      id: 4,
      label: "Facturation",
      icon: <MdPersonalInjury />,
      link: "facturation",
    },
    { id: 5, label: "Calendar", icon: <MdCalendarMonth />, link: "calendar" },
    { id: 6, label: "Office", icon: <PiStethoscopeBold />, link: "office" },
  ];

  const handleClick = (link) => {
    navigate(`/${link}`);
  };

  return (
    <>
      <div
        className={`h-full overflow-hidden bg-white ${
          expand ? `w-[240px]` : `w-[73px] `
        } relative z-20 transition-all duration-300 ease-in-out`}
        onMouseEnter={() => {
          setExpand(true);
        }}
        onMouseLeave={() => {
          setExpand(false);
        }}
      >
        <div className="flex flex-col h-full p-2 relative">
          <div
            className="absolute rounded-r-full my-1 left-0 top-0 w-1 bg-primary transition-all duration-300 ease-in-out"
            style={{
              top: `${selected ? selected * 53 + 8 : 8}px`,
              height: "45px",
            }}
          ></div>
          {menuItems.map((item) => (
            <Button
              key={item.id}
              startIcon={item.icon}
              onClick={() => handleClick(item.link, item.id)}
              className={`${
                selected === item.id
                  ? "!bg-primary !text-primaryText"
                  : "!bg-white !text-darkText"
              } hover:!bg-primary hover:!text-primaryText !my-1 `}
              sx={{
                textTransform: "none",
                padding: "16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                height: "45px",
                width: `80%`,
                maxWidth: "190px",
                minWidth: "40px",
                marginLeft: "8px",
              }}
            >
              <span
                className={`${
                  expand ? `opacity-100 w-fit` : `opacity-0 w-0`
                } transition-opacity delay-100`}
              >
                {item.label}
              </span>{" "}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-full bg-white w-[73px]"></div>
    </>
  );
};

export default Sidebar;
