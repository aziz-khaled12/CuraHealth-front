import React from "react";
import { format } from "date-fns";

// Page 1 Component - Contains patient info, diagnosis, and vitals
const PageOne = ({ record, clinic }) => {
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
        <p className="text-center text-sm text-gray-500">Page 1 of 2</p>
      </div>

      {/* Patient Information - Enhanced with card-like design */}
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Patient Information
        </h3>
        <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="flex items-center mb-3">
                <span className="font-semibold text-gray-700 w-32">
                  Patient Name:
                </span>
                <span className="text-gray-800 font-medium">
                  {record.patientName}
                </span>
              </p>
              <p className="flex items-center mb-3">
                <span className="font-semibold text-gray-700 w-32">
                  Consultation:
                </span>
                <span className="text-gray-800">{record.type}</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-gray-700 w-32">
                  Category:
                </span>
                <span className="text-gray-800">{record.category}</span>
              </p>
            </div>
            <div>
              <p className="flex items-center mb-3">
                <span className="font-semibold text-gray-700 w-32">
                  Doctor:
                </span>
                <span className="text-gray-800 font-medium">
                  {record.doctor}
                </span>
              </p>
              <p className="flex items-center mb-3">
                <span className="font-semibold text-gray-700 w-32">
                  Status:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    record.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : record.status === "Scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {record.status}
                </span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-gray-700 w-32">
                  Date & Time:
                </span>
                <span className="text-gray-800">{formattedDate}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Details - Enhanced with icons and better spacing */}
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Consultation Details
        </h3>

        <div className="mb-8 bg-indigo-50 p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Diagnosis
          </h4>
          <div className="flex flex-wrap gap-2">
            {record.diagnosis.map((item, index) => (
              <span
                key={`diagnosis-${index}`}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4 bg-blue-50 p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Consultation Cause
          </h4>
          <div className="flex flex-wrap gap-2">
            {record.consultationCause.map((item, index) => (
              <span
                key={`cause-${index}`}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
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
      </div>

      {/* Page Number Footer */}
      <div className="bg-gray-50 p-4 text-center text-sm text-gray-600 border-t border-gray-200">
        <p>Page 1 of 2</p>
      </div>

    </div>
  );
};

export default PageOne;