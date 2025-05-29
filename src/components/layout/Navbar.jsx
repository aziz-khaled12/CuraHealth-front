import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  Link,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import { FiChevronRight, FiHome, FiUser, FiBell } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import Notification from "../random/Notiifcation";

const initialNotifications = [
  {
    id: 1,
    type: "success",
    title: "Successfully saved!",
    message: "Your changes have been saved successfully.",
    time: "2 min ago",
    isRead: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Warning: Please review",
    message: "Some fields require your attention before proceeding.",
    time: "10 min ago",
    isRead: false,
  },
  {
    id: 3,
    type: "error",
    title: "Error: Failed to save",
    message: "There was an error while saving your changes.",
    time: "15 min ago",
    isRead: true,
  },
  {
    id: 4,
    type: "info",
    title: "Information: Account updated",
    message: "We've updated your account settings.",
    time: "1 hour ago",
    isRead: true,
  },
  {
    id: 5,
    type: "default",
    title: "New feature available",
    message: "Check out our latest features and improvements.",
    time: "2 hours ago",
    isRead: true,
  },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const notificationMenuOpen = Boolean(notificationAnchorEl);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [notifications, setNotifications] = useState(initialNotifications);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  // Generate breadcrumbs based on current route
  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Create breadcrumb array with paths
    const breadcrumbItems = pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

      return {
        name: formattedName,
        path: routeTo,
      };
    });

    setBreadcrumbs(breadcrumbItems);
  }, [location]);

  const handleOpenNotificationMenu = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setNotificationAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // Sample notifications data

  return (
    <div className="px-8 py-3 shadow-sm">
      <nav className="flex items-center justify-between w-full  bg-white">
        <div className="text-xl font-bold text-primary">Cura Health</div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex">
            <Tooltip title="Notifications">
              <IconButton
                className="relative"
                onClick={handleOpenNotificationMenu}
              >
                <FiBell className="text-xl text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </IconButton>
            </Tooltip>
          </div>
          <Menu
            anchorEl={notificationAnchorEl}
            id="notification-menu"
            open={notificationMenuOpen}
            onClose={handleCloseNotificationMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                minWidth: 320,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                mt: 1.5,
                borderRadius: 1,
                "& .MuiMenuItem-root": {
                  px: 1,
                  py: 1,
                  fontSize: "0.875rem",
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {/* Header */}
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">
                Notifications
              </h3>
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            </div>

            {/* Notification List */}
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  sx={{
                    padding: 1,
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  <Notification notification={notification} removeNotification={removeNotification} />
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <div className="py-4 text-center text-gray-500 text-sm w-full">
                  No notifications
                </div>
              </MenuItem>
            )}

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-center">
                <button
                  className="text-xs text-gray-600 hover:text-gray-800"
                  onClick={() => setNotifications([])}
                >
                  Clear all
                </button>
              </div>
            )}
          </Menu>
          

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleCloseMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                mt: 1.5,
                borderRadius: 1,
                minWidth: 180,
                "& .MuiMenuItem-root": {
                  px: 2,
                  py: 1.5,
                  fontSize: "0.875rem",
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {settings.map((setting, index) => (
              <MenuItem
                key={index}
                onClick={
                  setting === "Logout"
                    ? () => dispatch(logout())
                    : handleCloseMenu
                }
              >
                {setting === "Profile" && <FiUser className="mr-2" />}
                {setting}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </nav>
      {/* Integrated Breadcrumbs */}
      <div className="w-full">
        <Breadcrumbs
          separator={<FiChevronRight className="!text-gray-400 !text-sm" />}
          aria-label="breadcrumb"
        >
          <Link
            component="button"
            underline="hover"
            color="inherit"
            onClick={() => handleBreadcrumbClick("/")}
            className="flex items-center !text-sm !text-gray-600 !hover:text-primary"
          >
            <FiHome className="mr-1" />
            Home
          </Link>

          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return isLast ? (
              <Typography
                key={index}
                className="!text-sm !font-medium !text-gray-800"
              >
                {breadcrumb.name}
              </Typography>
            ) : (
              <Link
                key={index}
                component="button"
                underline="hover"
                color="inherit"
                onClick={() => handleBreadcrumbClick(breadcrumb.path)}
                className="!text-sm !text-gray-600 !hover:text-primary"
              >
                {breadcrumb.name}
              </Link>
            );
          })}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default Navbar;
