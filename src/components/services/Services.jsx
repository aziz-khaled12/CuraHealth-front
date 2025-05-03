import React, { useEffect, useState } from "react";
import ServicesModal from "./ServicesModal";
import { Box, Button } from "@mui/material";
import Header from "../random/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useHasPermission from "../../hooks/useHasPermission";
import { fetchServices } from "../../redux/servicesSlice";

const Services = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  const { services } = useSelector((state) => state.services);

  const canAdd = useHasPermission("add Service");
  const canModify = useHasPermission("modify Service");
  const canDelete = useHasPermission("delete Service");

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
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="flex flex-col h-full w-full">
      {open && <ServicesModal open={open} setOpen={setOpen} cellData={null} />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          marginBottom: "1rem",
        }}
      >
        {/* <Header
          title={"Services"}
          subTitle={"Manage your Services and Prices"}
        /> */}
        {canAdd && (
          <Button
            startIcon={<MdAdd />}
            onClick={handleOpen}
            variant="contained"
            sx={{ textTransform: "none" }}
            
          >
            New Service
          </Button>
        )}
      </Box>

      <Box sx={{ height: "69vh" }}>
        <DataGrid
          rows={services}
          slots={{ toolbar: GridToolbar }}
          columns={columns}
          getRowId={(row) => row.id}
          autoPageSize
          sx={{
            height: '100%',
            width: '100%',
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#fafafa',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: '#fff',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid #f0f0f0',
              backgroundColor: '#fafafa',
            },
            '& .MuiDataGrid-toolbarContainer': {
              padding: '8px',
              backgroundColor: '#fafafa',
            },
          }}
        />
      </Box>
    </div>
  );
};

export default Services;
