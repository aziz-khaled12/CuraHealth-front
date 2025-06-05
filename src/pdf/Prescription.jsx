import { format } from "date-fns";
import React from "react";

const Prescription = ({ record, clinic }) => {
  // Format the date
  const formattedDate = format(
    new Date(record.startedAt),
    "MMMM dd, yyyy 'at' h:mm a"
  );
  return (
    <div>
      {/* Enhanced Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
        <p className="text-9xl font-bold text-primary transform -rotate-45">
          CURA HEALTH
        </p>
      </div>

      {/* Enhanced Header with gradient */}
      <div className="relative z-10 bg-gradient-to-r from-blue-700 to-blue-500 text-gray-600 p-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white rounded-full p-2 mr-4 shadow-md">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-gray-600 font-bold text-2xl">
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
          <div className="inline-block bg-red-600 text-gray-600 text-xs font-bold px-3 py-1 rounded shadow-sm">
            CONFIDENTIAL
          </div>
          <p className="text-sm mt-2">Doctor: {record.doctor}</p>
          <p className="text-sm">Date: {formattedDate}</p>
        </div>
      </div>

      {/* Document Title */}
      <div className="bg-gray-50 border-b border-gray-200 px-8 py-4">
        <h2 className="text-xl font-bold text-center text-blue-700">
          MEDICAL PRESCRIPTION 
        </h2>
      </div>
      <div className="p-8 border-b border-gray-200 bg-white">
        <h3 className="text-lg font-bold text-blue-700 mb-4 pb-2 border-b-2 border-gray-200 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Medications
        </h3>

        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Medication
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Frequency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Instructions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {record.medicaments.map((med, index) => (
                <tr key={`med-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {med.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {med.frequency || "As prescribed"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {med.quantity || "As prescribed"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {med.instructions || "Follow doctor's instructions"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
