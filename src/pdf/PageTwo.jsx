import React from "react";
import { format } from "date-fns";

// Page 2 Component - Contains medications, signs, services, and signatures
const PageTwo = ({ record, clinic }) => {
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
  
        {/* Document Title */}
        <div className="bg-gray-50 border-b border-gray-200 px-8 py-4">
          <h2 className="text-xl font-bold text-center text-blue-700">
            MEDICAL CONSULTATION RECORD
          </h2>
          <p className="text-center text-sm text-gray-500">Page 2 of 2</p>
        </div>
  
        {/* Medications - Enhanced with better table design */}
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
                    Dosage
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
                      {med.dosage || "As prescribed"}
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
  
        {/* Services - Enhanced with better badges */}
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
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            Services Provided
          </h3>
  
          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-3">
              {record.services.map((service, index) => (
                <span
                  key={`service-${index}`}
                  className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm flex items-center shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
  
        {/* Enhanced Signature Section with better styling */}
        <div className="p-8 bg-gray-50">
          <h3 className="text-lg font-bold text-blue-700 mb-6 pb-2 border-b-2 border-gray-200 text-center">
            Authentication
          </h3>
  
          <div className="flex justify-between items-start mt-4">
            <div className="w-1/3">
              <div className="border-t-2 border-blue-300 pt-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 border-2 border-blue-200 rounded-full mb-2 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
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
                </div>
                <p className="text-center text-sm text-gray-600">
                  Doctor's Signature
                </p>
                <p className="text-center text-sm font-semibold mt-1">
                  {record.doctor}
                </p>
              </div>
            </div>
  
            <div className="w-1/3">
              <div className="border-t-2 border-blue-300 pt-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 border-2 border-blue-200 rounded-full mb-2 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
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
                </div>
                <p className="text-center text-sm text-gray-600">
                  Patient's Signature
                </p>
                <p className="text-center text-sm font-semibold mt-1">
                  {record.patientName}
                </p>
              </div>
            </div>
  
            <div className="w-1/3">
              <div className="border-t-2 border-blue-300 pt-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 border-2 border-blue-200 rounded-full mb-2 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <p className="text-center text-sm text-gray-600">
                  Medical Officer
                </p>
                <p className="text-center text-sm font-semibold mt-1">
                  Verification Complete
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-center text-white border-t border-gray-200">
          <p className="font-semibold">
            This is a confidential medical record. Unauthorized access, use, or
            disclosure is strictly prohibited.
          </p>
          <p className="mt-2 text-sm">
            © {new Date().getFullYear()} Cura Health Medical Center. All rights
            reserved.
          </p>
          <p className="text-sm mt-2">Page 2 of 2</p>
        </div>
      </div>
    );
  };

  export default PageTwo;