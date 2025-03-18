import React, { useEffect, useState } from "react";
import ServicesModal from "./ServicesModal";
import { Box, Button } from "@mui/material";
import Header from "../random/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";

const Services = () => {
  const [open, setOpen] = useState(false);

  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    console.log(services);
  }, [services]);

  const columns = [
    {
      field: "id",
      headerName: "#",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Service Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className={`w-full transition-all duration-100 ease-in-out`}>
      {open && <ServicesModal open={open} setOpen={setOpen} cellData={null} />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Header
          title={"Services"}
          subTitle={"Manage your Services and Prices"}
        />

        <Button
          startIcon={<MdAdd />}
          onClick={handleOpen}
          variant="contained"
          sx={{ textTransform: "none" }}
          className="!bg-primary"
        >
          New Service
        </Button>
      </Box>

      <Box sx={{ height: "69vh" }}>
        <DataGrid
          rows={services}
          slots={{ toolbar: GridToolbar }}
          columns={columns}
          autoPageSize
          sx={{
            width: "100%",
            "@media (max-width: 600px)": {
              "& .MuiDataGrid-root": {
                fontSize: "0.8rem",
              },
            },
          }}
        />
      </Box>
    </div>
  );
};

export default Services;
