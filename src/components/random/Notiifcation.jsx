import { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X,
} from "lucide-react";

// Notification types with their respective icons and colors
const NOTIFICATION_TYPES = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
    textColor: "text-green-800",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-500",
    textColor: "text-yellow-800",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50",
    iconColor: "text-red-500",
    textColor: "text-red-800",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
    textColor: "text-blue-800",
  },
  default: {
    icon: Bell,
    bgColor: "bg-gray-50",
    iconColor: "text-gray-500",
    textColor: "text-gray-800",
  },
};

const Notification = ({ notification, removeNotification }) => {
  const { id, type, title, message, time, isRead } = notification;
  const notificationType =
    NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.default;
  const Icon = notificationType.icon;

  return (
    <div
      className={`${notificationType.bgColor} ${
        isRead ? "opacity-75" : ""
      } p-3 rounded-md transition-all w-full hover:shadow-md`}
      onClick={() => markAsRead(id)}
    >
      <div className="w-full flex items-start justify-between">
        {/* Icon */}
        <div className={` ${notificationType.iconColor} mt-1`}>
          <Icon size={18} />
        </div>

        {/* Content */}
        <div className="w-full ml-3">
          <div className="flex w-full justify-between items-start">
            <p className={`text-sm font-medium ${notificationType.textColor}`}>
              {title}
            </p>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-2">{time}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(id);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            </div>
          </div>
          <p className={`mt-1 text-xs ${notificationType.textColor} opacity-80`}> {message} </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
