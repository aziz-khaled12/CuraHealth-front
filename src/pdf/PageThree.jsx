import React from "react";
import { format } from "date-fns";

// Page 2 Component - Contains medications, signs, services, and signatures
const PageThree = ({ record, clinic }) => {
  // Format the date
  const formattedDate = format(
    new Date(record.startedAt),
    "MMMM dd, yyyy 'at' h:mm a"
  );

  return (
    <div className="bg-white w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden border border-gray-200 min-h-screen relative">
      {/* Enhanced Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
        <p className="text-9xl font-bold text-primary transform -rotate-45">
          CURA HEALTH
        </p>
      </div>

      {/* Enhanced Header with gradient */}
      <div className="relative z-10 bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white rounded-full p-2 mr-4 shadow-md">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">
              CH
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {clinic?.name || "Cura Health Medical Center"}
            </h1>
            <p className="text-sm opacity-90">Patient: {record.patientName}</p>
            <p className="text-sm opacity-90">Record ID: {record.id}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-sm">
            CONFIDENTIAL
          </div>
          <p className="text-sm mt-2">Doctor: {record.doctor}</p>
          <p className="text-sm">Date: {formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PageThree;
