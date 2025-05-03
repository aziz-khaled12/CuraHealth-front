
import React, { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const StatCard = ({ 
  title, 
  Icon, 
  value,
  change = "+12%", 
  changeType = "positive", 
  timeframe = "vs. last month",
  accentColor = "#4F46E5",
  description
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getChangeColor = () => {
    if (changeType === "positive") return "text-emerald-500";
    if (changeType === "negative") return "text-rose-500";
    return "text-gray-500";
  };

  const getChangeIcon = () => {
    if (changeType === "positive") return <TrendingUp size={16} className="mr-1" />;
    if (changeType === "negative") return <TrendingDown size={16} className="mr-1" />;
    return <Minus size={16} className="mr-1" />;
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md border border-gray-200  p-6 flex-1 transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
      }}
      aria-label={`${title}: ${value} ${change} ${timeframe}`}
    >

      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle at top right, ${accentColor}, transparent 70%)`,
        }}
      />
      
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-600 ">{title}</h4>
        <div 
          className="rounded-full p-3 transition-all duration-300 transform"
          style={{ 
            backgroundColor: `${accentColor}15`,
            color: accentColor,
            transform: isHovered ? "scale(1.1)" : "scale(1)"
          }}
          aria-hidden="true"
        >
          <Icon size={20} className="transition-transform duration-300" />
        </div>
      </div>
      
      <div className="mb-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">{value}</h1>
      </div>
      
      {change && (
        <div className="flex items-center text-sm mb-2">
          <span className={`flex items-center font-medium ${getChangeColor()}`}>
            {getChangeIcon()}
            {change}
          </span>
          <span className="text-gray-500  ml-1">{timeframe}</span>
        </div>
      )}
      
      {description && (
        <div className="mt-2 text-sm text-gray-500 ">
          {description}
        </div>
      )}

      <div 
        className="absolute bottom-0 left-0 h-1 transition-all duration-500 ease-out"
        style={{ 
          backgroundColor: accentColor,
          width: isHovered ? "100%" : "0%",
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default StatCard;