import React, { useState, useEffect } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, DownloadCloud, BarChart3, TrendingUp, Filter } from "lucide-react";

// Base data - we'll filter this based on the selected time range
const allData = [
  { name: "Jan", value: 4000, previousValue: 2400, month: 0 },
  { name: "Feb", value: 3000, previousValue: 1398, month: 1 },
  { name: "Mar", value: 2000, previousValue: 9800, month: 2 },
  { name: "Apr", value: 2780, previousValue: 3908, month: 3 },
  { name: "May", value: 1890, previousValue: 4800, month: 4 },
  { name: "Jun", value: 2390, previousValue: 3800, month: 5 },
  { name: "Jul", value: 3490, previousValue: 4300, month: 6 },
  { name: "Aug", value: 4000, previousValue: 2400, month: 7 },
  { name: "Sep", value: 3000, previousValue: 1398, month: 8 },
  { name: "Oct", value: 2000, previousValue: 9800, month: 9 },
  { name: "Nov", value: 2780, previousValue: 3908, month: 10 },
  { name: "Dec", value: 1890, previousValue: 4800, month: 11 }
];

// Daily data for 1D time range
const dailyData = [
  { name: "9AM", value: 1000, previousValue: 800 },
  { name: "10AM", value: 1200, previousValue: 900 },
  { name: "11AM", value: 1400, previousValue: 1100 },
  { name: "12PM", value: 1300, previousValue: 1000 },
  { name: "1PM", value: 1500, previousValue: 1200 },
  { name: "2PM", value: 1700, previousValue: 1400 },
  { name: "3PM", value: 1600, previousValue: 1300 },
  { name: "4PM", value: 1800, previousValue: 1500 },
  { name: "5PM", value: 1900, previousValue: 1600 }
];

// Weekly data for 1W time range
const weeklyData = [
  { name: "Mon", value: 2100, previousValue: 1800 },
  { name: "Tue", value: 2300, previousValue: 2000 },
  { name: "Wed", value: 2700, previousValue: 2200 },
  { name: "Thu", value: 2500, previousValue: 2100 },
  { name: "Fri", value: 2900, previousValue: 2400 },
  { name: "Sat", value: 2200, previousValue: 1900 },
  { name: "Sun", value: 2000, previousValue: 1700 }
];

const chartTypes = {
  line: {
    name: "Line",
    icon: <TrendingUp size={16} />,
    chart: (data, colors) => (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "white", 
            borderRadius: "0.5rem", 
            border: "none", 
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
          }} 
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={colors.primary} 
          strokeWidth={2} 
          dot={{ stroke: colors.primary, strokeWidth: 2, r: 4, fill: "white" }} 
          activeDot={{ r: 6, stroke: colors.primary, strokeWidth: 2, fill: "white" }} 
        />
        <Line 
          type="monotone" 
          dataKey="previousValue" 
          stroke={colors.secondary} 
          strokeDasharray="5 5" 
          strokeWidth={2} 
          dot={false} 
        />
      </LineChart>
    )
  },
  area: {
    name: "Area",
    icon: <ArrowUpRight size={16} />,
    chart: (data, colors) => (
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "white", 
            borderRadius: "0.5rem", 
            border: "none", 
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
          }} 
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke={colors.primary} 
          fill={`${colors.primary}20`} 
          strokeWidth={2}
        />
        <Area 
          type="monotone" 
          dataKey="previousValue" 
          stroke={colors.secondary} 
          fill={`${colors.secondary}10`} 
          strokeDasharray="5 5" 
          strokeWidth={2}
        />
      </AreaChart>
    )
  },
  bar: {
    name: "Bar",
    icon: <BarChart3 size={16} />,
    chart: (data, colors) => (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "white", 
            borderRadius: "0.5rem", 
            border: "none", 
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
          }} 
        />
        <Bar dataKey="value" fill={colors.primary} radius={[4, 4, 0, 0]} />
        <Bar dataKey="previousValue" fill={colors.secondary} radius={[4, 4, 0, 0]} />
      </BarChart>
    )
  }
};

const DashboardChart = ({
  title = "Performance Analytics",
  description = "Track your performance metrics over time",
  primaryColor = "#8b5cf6",
  secondaryColor = "#e5e7eb",
  timeRanges = ["1D", "1W", "1M", "1Y", "All"],
  defaultTimeRange = "1Y",
  defaultChartType = "line"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedRange, setSelectedRange] = useState(defaultTimeRange);
  const [chartType, setChartType] = useState(defaultChartType);
  const [chartData, setChartData] = useState([]);
  
  const colors = {
    primary: primaryColor,
    secondary: secondaryColor
  };

  // Filter data based on selected time range
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    
    let filteredData;
    
    switch(selectedRange) {
      case "1D":
        filteredData = [...dailyData];
        break;
      case "1W":
        filteredData = [...weeklyData];
        break;
      case "1M":
        // Last month of data
        filteredData = allData.filter(item => {
          return item.month === currentMonth || item.month === (currentMonth > 0 ? currentMonth - 1 : 11);
        });
        break;
      case "1Y":
        // Full year of data
        filteredData = [...allData];
        break;
      case "All":
        // All available data (just using all data for demo)
        filteredData = [...allData];
        break;
      default:
        filteredData = [...allData];
    }
    
    setChartData(filteredData);
  }, [selectedRange]);

  return (
    <div 
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at top right, ${primaryColor}, transparent 70%)`,
          zIndex: 0
        }}
      />
      
      {/* Header section */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Download chart data"
          >
            <DownloadCloud size={18} className="text-gray-500" />
          </button>
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Filter chart data"
          >
            <Filter size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Chart controls */}
      <div className="flex items-center justify-between mb-6">
        {/* Time range selector */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {timeRanges.map(range => (
            <button 
              key={range}
              className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${
                selectedRange === range 
                  ? `bg-white text-gray-900 shadow-sm` 
                  : `text-gray-500 hover:text-gray-700`
              }`}
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
        
        {/* Chart type selector */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {Object.entries(chartTypes).map(([type, { name, icon }]) => (
            <button 
              key={type}
              className={`text-xs px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                chartType === type 
                  ? `bg-white text-gray-900 shadow-sm` 
                  : `text-gray-500 hover:text-gray-700`
              }`}
              onClick={() => setChartType(type)}
              aria-label={`Switch to ${name} chart`}
            >
              {icon}
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Chart area */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartData.length > 0 ? chartTypes[chartType].chart(chartData, colors) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading chart data...</p>
            </div>
          )}
        </ResponsiveContainer>
      </div>
      
      {/* Chart legend */}
      <div className="flex items-center justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: primaryColor }}
          />
          <span className="text-xs text-gray-600">Current Period</span>
        </div>
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: secondaryColor }}
          />
          <span className="text-xs text-gray-600">Previous Period</span>
        </div>
      </div>
      
      {/* Bottom border accent that animates on hover */}
      <div 
        className="absolute bottom-0 left-0 h-1 transition-all duration-500 ease-out pointer-events-none"
        style={{ 
          backgroundColor: primaryColor,
          width: isHovered ? "100%" : "0%",
          zIndex: 0
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default DashboardChart;