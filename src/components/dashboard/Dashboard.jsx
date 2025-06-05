import React from "react";
import {
  FaCalendar,
} from "react-icons/fa";
import StatCard from "./dashboardUtils/StatCard";
import { FaHeartPulse, FaUser, FaUserGroup } from "react-icons/fa6";
import DashboardChart from "./dashboardUtils/DashboardChart";

const Dashboard = () => {
  const stats = [
    {
      title: "Patients Today",
      Icon: FaUser,
      value: 67,
    },
    {
      title: "New Patients",
      Icon: FaUserGroup,
      value: 5,
    },
    {
      title: "Total Appointments",
      Icon: FaCalendar,
      value: 689,
    },
    {
      title: "Critical Cases",
      Icon: FaHeartPulse,
      value: 58,
    },
  ];
  return (
    <div>
      <div className="flex gap-4 w-full mb-4">
        {stats.map((stat, index) => {
          return (
            <StatCard
              key={index}
              title={stat.title}
              Icon={stat.Icon}
              value={stat.value}
              accentColor="#0D3B66"
            />
          );
        })}
      </div>
      <div>
        <DashboardChart
          title="Revenue Growth"
          description="Monthly revenue compared to previous year"
          primaryColor="#0D3B66"
          secondaryColor="#94a3b8"
        />
      </div>
    </div>
  );
};

export default Dashboard;
