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

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
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

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <div className="px-8 py-3 shadow-sm">
      <nav className="flex items-center justify-between w-full  bg-white">
        <div className="text-xl font-bold text-primary">Cura Health</div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex">
            <Tooltip title="Notifications">
              <IconButton className="relative">
                <FiBell className="text-xl text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </IconButton>
            </Tooltip>
          </div>

          <div className="flex items-center gap-3">
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleOpenMenu}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{ width: 40, height: 40, bgcolor: "#6366F1" }}
                  alt="Ahmed Twati"
                >
                  AT
                </Avatar>
              </IconButton>
            </Tooltip>
            <div className="hidden md:block leading-4">
              <div className="text-sm font-medium text-gray-800">
                Ahmed Twati
              </div>
              <div className="text-xs font-medium text-gray-500">Doctor</div>
            </div>
          </div>

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
              <MenuItem key={setting} onClick={handleCloseMenu}>
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
