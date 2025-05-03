import React from "react";
import {
  FaCalendar,
  FaCriticalRole,
  FaMoneyBillWave,
  FaUserInjured,
} from "react-icons/fa";
import StatCard from "./dashboardUtils/StatCard";
import { FaHeartPulse, FaUser, FaUserGroup } from "react-icons/fa6";
import DashboardChart from "./dashboardUtils/DashboardChart";

const Dashboard = () => {
  const stats = [
    {
      title: "Patients Today",
      Icon: FaUser,
      value: 1000,
    },
    {
      title: "New Patients",
      Icon: FaUserGroup,
      value: 100,
    },
    {
      title: "Total Appointments",
      Icon: FaCalendar,
      value: 1000,
    },
    {
      title: "Critical Cases",
      Icon: FaHeartPulse,
      value: 1000000,
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
