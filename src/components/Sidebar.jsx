import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { MdPersonalInjury, MdCalendarMonth } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";

const Sidebar = ({ selected, setSelected }) => {
  const menuItems = [
    { id: 0, label: "Dashboard", icon: <BiSolidDashboard /> },
    { id: 1, label: "Patients", icon: <MdPersonalInjury /> },
    { id: 2, label: "Appointments", icon: <MdCalendarMonth /> },
    { id: 3, label: "Rapports", icon: <MdPersonalInjury /> },
    { id: 4, label: "Facturation", icon: <MdPersonalInjury /> },
  ];

  const handleSelect = (id) => {
    setSelected(id);
  };

  return (
    <div
      className={`h-full bg-white transition-all duration-300 ease-in-out w-[240px]`}
    >
      <div className="text-2xl font-semibold my-5 text-center">Cura Health</div>

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
            <span>{item.label}</span>{" "}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
