import React from "react";
import { FaCalendar, FaClock, FaUserInjured } from "react-icons/fa";
import OfficeCard from "../OfficeCard";

const StatisticsCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((card, index) => (
        <OfficeCard key={index} card={card} />
      ))}
    </div>
  );
};

export default StatisticsCards;