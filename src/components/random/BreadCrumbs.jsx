import { Breadcrumbs, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiChevronRight, FiHome } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const BreadCrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };
  return (
    <div className="mb-3">
      <Breadcrumbs
        separator={<FiChevronRight className="!text-gray-400 !text-sm" />}
        aria-label="breadcrumb"
      >
        <Link
          underline="hover"
          color="inherit"
          href="/"
          className="!flex !items-center !text-sm !text-gray-600"
        >
          <FiHome className="mr-1" />
        </Link>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return isLast ? (
            <h1
              key={index}
              className="text-sm font-medium text-gray-800"
            >
              {breadcrumb.name}
            </h1>
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
  );
};

export default BreadCrumbs;
