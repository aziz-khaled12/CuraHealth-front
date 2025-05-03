import { format } from "date-fns";
import React from "react";
import {
  FaCalendar,
  FaClock,
  FaFileAlt,
  FaDownload,
  FaUserMd,
  FaStethoscope,
  FaNotesMedical,
  FaChevronRight,
} from "react-icons/fa";
import useHasPermission from "../../hooks/useHasPermission";
import { useNavigate } from "react-router-dom";

const PatientSessionCard = ({ session, handleViewDetails }) => {
  // Status badge styles based on status

  const canSeeDetails = useHasPermission("see recent Patient Records details");
  const canDownloadRecords = useHasPermission("download Patient records");
  const navigate = useNavigate();
  
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "in progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Session type icon
  const getSessionTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "consultation":
        return <FaUserMd className="text-primary" />;
      case "check-up":
        return <FaStethoscope className="text-green-500" />;
      case "emergency":
        return <FaNotesMedical className="text-red-500" />;
      default:
        return <FaUserMd className="text-primary" />;
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 group">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              {getSessionTypeIcon(session.type)}
            </div>
            <h3 className="text-base font-bold text-primary">{session.type}</h3>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(
              session.status
            )}`}
          >
            {session.status}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full shadow-sm">
            <FaCalendar className="h-3.5 w-3.5 text-primary" />{" "}
            {format(session.startedAt, "dd MMM yyyy")}
          </span>
          <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full shadow-sm">
            <FaClock className="h-3.5 w-3.5 text-primary" />{" "}
            {format(session.startedAt, "hh:mm a")}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="grid gap-3 text-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <FaUserMd className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Doctor</div>
              <div className="font-medium text-gray-800">{session.doctor}</div>
            </div>
          </div>
          <div className="my-2 h-px bg-gray-200"></div> {/* Separator */}
          <div>
            <div className="text-xs text-gray-500 mb-1.5">Diagnosis</div>
            <div className="flex flex-wrap gap-2">
              {session.diagnosis.map((item, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center p-3 border-t border-blue-200">
        <div className="flex-1">
          <div className="text-xs text-primary font-medium">
            Ref: {session.id}
          </div>
        </div>
        <div className="flex gap-2 flex-2">
          {canSeeDetails && (
            <button
              className="flex h-8 items-center gap-1.5 rounded-full border border-blue-300 bg-white px-3 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors shadow-sm"
              onClick={() => handleViewDetails(session)}
            >
              <FaFileAlt className="h-3 w-3" />
              View Details
            </button>
          )}

          {canDownloadRecords && (
            <button className="flex h-8 items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <FaDownload className="h-3 w-3" />
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientSessionCard;
