import { format } from "date-fns";
import React from "react";

const PrintPageTwo = ({ record, clinic }) => {
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
            <p className="text-sm opacity-90">
              {clinic?.address || "123 Healthcare Avenue, Medical District"}
            </p>
            <p className="text-sm opacity-90">
              {clinic?.contact ||
                "Tel: (123) 456-7890 • Email: info@curahealth.com"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-sm">
            CONFIDENTIAL
          </div>
          <p className="text-sm mt-2">Record ID: {record.id}</p>
          <p className="text-sm">Date: {formattedDate}</p>
        </div>
      </div>

      {/* Document Title */}
      <div className="bg-gray-50 border-b border-gray-200 px-8 py-4">
        <h2 className="text-xl font-bold text-center text-blue-700">
          MEDICAL CONSULTATION RECORD
        </h2>
        <p className="text-center text-sm text-gray-500">Page 2 of 3</p>
      </div>
      {/* Vitals - Enhanced with modern cards */}
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
              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Vital Signs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {record.vitals.map((vital, index) => (
            <div
              key={`vital-${index}`}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-xs text-gray-500 uppercase">{vital.name}</p>
              <p className="text-lg font-semibold text-blue-700 mt-1">
                {vital.value}
              </p>
            </div>
          ))}
        </div>
        {/* Signs - Enhanced with better cards and icons */}
        <div className="p-8 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-blue-700 mb-4 pb-2 border-b border-blue-200 flex items-center">
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
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Physical Signs
            </h3>
            <ul className="space-y-2">
              {record.physicalSigns.map((sign, index) => (
                <li
                  key={`physical-${index}`}
                  className="text-gray-700 text-sm flex items-start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-blue-700 mb-4 pb-2 border-b border-indigo-200 flex items-center">
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
                  d="M7 11.5V14m0-2.5v-6a2 2 0 014 0v6a2 2 0 01-4 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 8h2a2 2 0 012 2v4a2 2 0 01-2 2h-2v-4h2"
                />
              </svg>
              Functional Signs
            </h3>
            <ul className="space-y-2">
              {record.functionalSigns.map((sign, index) => (
                <li
                  key={`functional-${index}`}
                  className="text-gray-700 text-sm flex items-start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-indigo-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {sign}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Page Number Footer */}
      <div className="bg-gray-50 p-4 text-center text-sm text-gray-600 border-t border-gray-200 absolute bottom-0 w-full">
        <p>Page 2 of 3</p>
      </div>
    </div>
  );
};

export default PrintPageTwo;
