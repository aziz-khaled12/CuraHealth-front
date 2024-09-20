import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { MdPersonalInjury, MdCalendarMonth, MdClose } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";

const Sidebar = ({ selected, setSelected }) => {
  const [expand, setExpand] = useState(false);
  const menuItems = [
    { id: 0, label: "Dashboard", icon: <BiSolidDashboard /> },
    { id: 1, label: "Patients", icon: <MdPersonalInjury /> },
    { id: 2, label: "Appointments", icon: <MdCalendarMonth /> },
    { id: 3, label: "Rapports", icon: <MdPersonalInjury /> },
    { id: 4, label: "Facturation", icon: <MdPersonalInjury /> },
    { id: 5, label: "Calendar", icon: <MdCalendarMonth /> },
  ];

  const handleSelect = (id) => {
    setSelected(id);
  };

  return (
    <>
      
      <div
        className={`h-full overflow-hidden bg-white ${
          expand ? `w-[240px]` : `w-[73px] `
        } fixed z-20 transition-all duration-300 ease-in-out`}
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
              onClick={() => handleSelect(item.id)}
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
