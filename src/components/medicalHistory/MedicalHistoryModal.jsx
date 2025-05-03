import React, { useState } from "react";
import { Modal, Box, Typography, Backdrop, Button } from "@mui/material";
import { format } from "date-fns";
import {
  FaTimes,
  FaHospital,
  FaMedkit,
  FaClipboardList,
  FaPills,
  FaImage,
  FaChartLine,
  FaHeartbeat,
  FaFileAlt,
  FaCalendarAlt,
  FaAngleLeft,
  FaAngleRight,
  FaInfoCircle,
  FaUser,
  FaSearch,
  FaDownload,
  FaPrint,
  FaEllipsisV,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { downloadPDF, printPDF } from "../../utils/pdfHandler";
import ViewerModal from "../random/ViewerModal";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`session-tabpanel-${index}`}
      aria-labelledby={`session-tab-${index}`}
      {...other}
      style={{ height: "100%" }}
    >
      {value === index && (
        <div className="p-4 md:p-6 h-full overflow-auto">{children}</div>
      )}
    </div>
  );
}

export function MedicalHistoryModal({ session, onClose }) {
  const url = import.meta.env.VITE_BACK_END_URL;
  const [tabValue, setTabValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const fileURLS = session.files.map((file) => {return `${url}/files/appointmnt/${session.id}/${file}`} )


  if (!session) return null;

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleFileSelect = (fileUrl) => {
    setSelectedFile(fileUrl);
    setViewerOpen(true);
  };

  const handleViewerClose = () => {
    setViewerOpen(false);
    setSelectedFile(null);
  };


  const getCategoryIcon = () => {
    switch (session.category) {
      case "Emergency":
        return <FaHospital className="text-white" />;
      case "Normal":
        return <FaMedkit className="text-white" />;
      default:
        return <FaClipboardList className="text-white" />;
    }
  };

  const getCategoryColor = () => {
    switch (session.category) {
      case "Emergency":
        return "#ef4444"; // Tailwind primary
      case "Normal":
        return "#3b82f6"; // Tailwind primary
      default:
        return "#6b7280"; // Tailwind gray-500
    }
  };

  const tabConfig = [
    {
      id: 0,
      label: "Overview",
      icon: <FaChartLine />,
    },
    {
      id: 1,
      label: "Vitals",
      icon: <FaHeartbeat />,
    },
    {
      id: 2,
      label: "Prescriptions",
      icon: <FaPills />,
    },
    {
      id: 3,
      label: "Documents",
      icon: <FaFileAlt />,
    },
  ];

  const clinic = {
    name: "Cura Health Medical Center",
    address: "123 Healthcare Avenue, Medical District",
    contact: "Tel: (123) 456-7890 • Email: info@curahealth.com",
  };



  const navigate = useNavigate();
  console.log("session", session);

  return (
    <>
      <Modal
        open={!!session}
        onClose={onClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: {
            backdropFilter: "blur(3px)",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-5 flex items-center border-b border-gray-200 bg-white">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg mr-4"
              style={{ backgroundColor: getCategoryColor() }}
            >
              {getCategoryIcon()}
            </div>
            <div className="flex-grow">
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {session.category} Consultation
                </h2>
                <span className="ml-3 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                  Ref: {session.id}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="opacity-70" />
                  <span>
                    {format(session.startedAt, "dd MMMM yyyy, hh:mm a")}
                  </span>
                </div>
                <span className="mx-2">•</span>
                <div className="flex items-center gap-1">
                  <FaUser className="opacity-70" />
                  <span>Dr. {session.doctor || "Jennifer Smith"}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => printPDF(session, clinic)}
              >
                <FaPrint className="text-gray-600" />
              </button>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => downloadPDF(session, clinic)}

              >
                <FaDownload className="text-gray-600" />
              </button>
              <button
              onClick={() => navigate("/test")}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <FaEllipsisV className="text-gray-600" />
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-primary transition-colors ml-1"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-white px-4">
            <div className="flex overflow-x-auto">
              {tabConfig.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 px-5 py-4 font-medium border-b-2 transition-colors min-w-[120px] ${
                    tabValue === tab.id
                      ? `border-primary text-primary`
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <span
                    className={`text-lg ${
                      tabValue === tab.id ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow bg-gray-50 overflow-auto">
            {/* Overview Tab */}
            <TabPanel value={tabValue} index={0}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="py-3 px-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                        <FaInfoCircle />
                      </div>
                      <h3 className="font-semibold text-blue-800">
                        Consultation Cause
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-primary bg-blue-100 px-2 py-1 rounded-full">
                      {session.consultationCause?.length || 0} items
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3">
                      {session.consultationCause?.map((cause, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-start gap-3 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{cause}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="py-3 px-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                        <FaInfoCircle />
                      </div>
                      <h3 className="font-semibold text-blue-800">Diagnosis</h3>
                    </div>
                    <span className="text-xs font-medium text-primary bg-blue-100 px-2 py-1 rounded-full">
                      {session.diagnosis?.length || 0} items
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3">
                      {session.diagnosis?.map((diagnosis, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-start gap-3 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{diagnosis}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg lg:col-span-2">
                  <div className="py-3 px-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                        <FaInfoCircle />
                      </div>
                      <h3 className="font-semibold text-blue-800">
                        Services Provided
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-primary bg-blue-100 px-2 py-1 rounded-full">
                      {session.services?.length || 0} services
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      {session.services?.map((service, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium shadow-sm hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-default"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Vitals Tab */}
            <TabPanel value={tabValue} index={1}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="py-3 px-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                      <FaHeartbeat />
                    </div>
                    <h3 className="font-semibold text-blue-800">Vital Signs</h3>
                  </div>
                  <div className="text-xs font-medium text-primary">
                    Last updated: {format(new Date(), "dd MMM yyyy")}
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {session.vitals?.map((vital, index) => (
                      <div
                        key={index}
                        className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-md group-hover:bg-primary transition-colors">
                            <FaHeartbeat className="text-2xl" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              {vital.name}
                            </div>
                            <div className="text-2xl font-bold text-gray-800 mt-1">{`${vital.value} ${vital.unit}`}</div>
                          </div>
                        </div>
                        {vital.status && (
                          <div
                            className={`mt-3 text-xs font-medium rounded-full px-3 py-1 inline-block ${
                              vital.status === "normal"
                                ? "bg-blue-100 text-blue-700"
                                : vital.status === "alert"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {vital.status === "normal"
                              ? "Normal"
                              : vital.status === "alert"
                              ? "Requires Attention"
                              : "Slightly Elevated"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Prescriptions Tab */}
            <TabPanel value={tabValue} index={2}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="py-3 px-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                      <FaPills />
                    </div>
                    <h3 className="font-semibold text-blue-800">
                      Prescribed Medications
                    </h3>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaSearch className="w-4 h-4 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      className="py-1.5 pl-10 pr-4 bg-white border border-gray-300 rounded-full text-sm focus:ring-primary focus:border-primary w-48"
                      placeholder="Search medications..."
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="space-y-5">
                    {session.medicaments?.map((prescription, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
                      >
                        <div className="flex">
                          <div className="w-2 bg-primary group-hover:bg-primary transition-colors"></div>
                          <div className="p-5 w-full">
                            <div className="flex flex-col md:flex-row md:items-center">
                              <div className="flex items-start flex-grow">
                                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-md mr-4 group-hover:bg-primary transition-colors">
                                  <FaPills className="text-xl" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-800 text-lg">
                                    {prescription.name}
                                  </h4>
                                  <div className="mt-2 space-x-2">
                                    {prescription.frequency && (
                                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        {prescription.frequency}
                                      </span>
                                    )}
                                    {prescription.quantity && (
                                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        {`${prescription.quantity} ${prescription.unit}`}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <h5 className="text-sm font-semibold text-gray-700 mb-2">
                                Instructions:
                              </h5>
                              <p className="text-gray-600">
                                {prescription.instructions}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Documents Tab */}
            <TabPanel value={tabValue} index={3}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="py-3 px-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                      <FaFileAlt />
                    </div>
                    <h3 className="font-semibold text-blue-800">
                      Medical Documents
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch className="w-4 h-4 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        className="py-1.5 pl-10 pr-4 bg-white border border-gray-300 rounded-full text-sm focus:ring-primary focus:border-primary w-48"
                        placeholder="Search documents..."
                      />
                    </div>
                    <button className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors flex items-center gap-1">
                      <FaFileAlt className="text-xs" />
                      <span>Upload New</span>
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {fileURLS.map((file, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
                        onClick={() => handleFileSelect(file)}
                      >
                        <div className="h-32 bg-blue-50 border-b border-gray-200 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-primary transition-colors shadow-md">
                            <FaImage className="text-2xl" />
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="font-medium text-gray-800 truncate group-hover:text-blue-700 transition-colors">
                            {file.file?.name || `Document ${index + 1}`}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-gray-500">
                              {format(new Date(), "MMM dd, yyyy")}
                            </div>
                            <div className="text-xs font-medium text-primary bg-blue-50 px-2 py-0.5 rounded-full">
                              View
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
      </Modal>
      
      {viewerOpen && (
        <ViewerModal
          open={viewerOpen}
          file={selectedFile}
          onClose={handleViewerClose}
        />
      )}
     
    </>
  );
}

export default MedicalHistoryModal;
