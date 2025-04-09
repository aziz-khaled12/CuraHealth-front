import React from "react";
import { format } from "date-fns";

const MedicalRecordTemplate = ({ record, clinic }) => {
  // Format the date
  const formattedDate = format(new Date(record.startedAt), "MMMM dd, yyyy 'at' h:mm a");
  
  return (
    <div className="bg-white w-full max-w-4xl mx-auto my-8 shadow-lg rounded-lg overflow-hidden border border-gray-200 h-full">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
        <p className="text-9xl font-bold text-primary transform -rotate-45">CURA HEALTH</p>
      </div>
      
      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-primary to-blue-500 text-white p-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white rounded-full p-2 mr-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              CH
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">{clinic?.name || "Cura Health Medical Center"}</h1>
            <p className="text-xs opacity-90">{clinic?.address || "123 Healthcare Avenue, Medical District"}</p>
            <p className="text-xs opacity-90">{clinic?.contact || "Tel: (123) 456-7890 • Email: info@curahealth.com"}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            CONFIDENTIAL
          </div>
          <p className="text-xs mt-2">Record ID: {record.id}</p>
          <p className="text-xs">Date: {formattedDate}</p>
        </div>
      </div>
      
      {/* Document Title */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-bold text-center text-primary">MEDICAL CONSULTATION RECORD</h2>
      </div>
      
      {/* Patient Information */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Patient Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="flex">
              <span className="font-semibold text-gray-700 w-32 text-sm">Patient Name:</span>
              <span className="text-gray-800 text-sm">{record.patientName}</span>
            </p>
            <p className="flex mt-2">
              <span className="font-semibold text-gray-700 w-32 text-sm">Consultation:</span>
              <span className="text-gray-800 text-sm">{record.type}</span>
            </p>
            <p className="flex mt-2">
              <span className="font-semibold text-gray-700 w-32 text-sm">Category:</span>
              <span className="text-gray-800 text-sm">{record.category}</span>
            </p>
          </div>
          <div>
            <p className="flex">
              <span className="font-semibold text-gray-700 w-32 text-sm">Doctor:</span>
              <span className="text-gray-800 text-sm">{record.doctor}</span>
            </p>
            <p className="flex mt-2 text-sm">
              <span className="font-semibold text-gray-700 w-32">Status:</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                record.status === "Completed" ? "bg-green-100 text-green-800" : 
                record.status === "Scheduled" ? "bg-blue-100 text-blue-800" : 
                "bg-yellow-100 text-yellow-800"
              }`}>
                {record.status}
              </span>
            </p>
            <p className="flex mt-2">
              <span className="font-semibold text-gray-700 w-32 text-sm">Date & Time:</span>
              <span className="text-gray-800 text-sm">{formattedDate}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Consultation Details */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Consultation Details
        </h3>
        
        <div className="mb-4">
          <h4 className="font-semibold text-primary mb-2">Diagnosis</h4>
          <div className="flex flex-wrap gap-2">
            {record.diagnosis.map((item, index) => (
              <span 
                key={`diagnosis-${index}`} 
                className="bg-indigo-50 text-primary px-3 py-1 rounded-full text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-primary mb-2">Consultation Cause</h4>
          <div className="flex flex-wrap gap-2">
            {record.consultationCause.map((item, index) => (
              <span 
                key={`cause-${index}`} 
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Vitals */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Vital Signs
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {record.vitals.map((vital, index) => (
            <div 
              key={`vital-${index}`} 
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <p className="text-xs text-gray-500">{vital.name}</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">{vital.value}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Medications */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Medications
        </h3>
        
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medication
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dosage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {record.medicaments.map((med, index) => (
                <tr key={`med-${index}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-800">
                    {med.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {med.dosage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Signs */}
      <div className="p-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Physical Signs
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {record.physicalSigns.map((sign, index) => (
              <li key={`physical-${index}`} className="text-gray-700 text-sm">{sign}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Functional Signs
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {record.functionalSigns.map((sign, index) => (
              <li key={`functional-${index}`} className="text-gray-700 text-sm">{sign}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Services */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Services Provided
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {record.services.map((service, index) => (
            <span 
              key={`service-${index}`} 
              className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
      
      {/* Signature Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mt-8">
          <div className="w-1/3">
            <div className="border-t-2 border-gray-300 pt-2">
              <p className="text-center text-xs text-gray-600">Doctor's Signature</p>
              <p className="text-center text-xs font-semibold mt-1">{record.doctor}</p>
            </div>
          </div>
          
          <div className="w-1/3">
            <div className="border-t-2 border-gray-300 pt-2">
              <p className="text-center text-xs text-gray-600">Patient's Signature</p>
              <p className="text-center text-xs font-semibold mt-1">{record.patientName}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-200">
        <p>This is a confidential medical record. Unauthorized access, use, or disclosure is strictly prohibited.</p>
        <p className="mt-1">© {new Date().getFullYear()} Cura Health Medical Center. All rights reserved.</p>
      </div>
    </div>
  );
};

export default MedicalRecordTemplate;