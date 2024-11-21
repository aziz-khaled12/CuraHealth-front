import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { CheckCircle, Cancel, Schedule } from "@mui/icons-material";
import { MdAdd } from "react-icons/md";
import AddNewModal from "../appointmentsModals/AddNewModal";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

const Appointments = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);

  useEffect(() => {
    console.log("appointments: ", appointments);
  }, [appointments]);

  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  // Status icon rendering
  const getStatusIcon = (status) => {
    switch (status) {
      case "Scheduled":
        return <Schedule fontSize="small" style={{ color: "blue" }} />;
      case "Visited":
        return <CheckCircle fontSize="small" style={{ color: "green" }} />;
      case "Canceled":
        return <Cancel fontSize="small" style={{ color: "red" }} />;
      default:
        return null;
    }
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5, // Small space for the ID
    },
    {
      field: "patientName",
      headerName: "Patient Name",
      flex: 1.5, // More space for the patient's name
      valueGetter: (value, row) => row.patient.fullName,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1, // Standard space for the date
      valueGetter: (value, row) =>
        format(new Date(row.startDate), "yyyy-MM-dd"),
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1, // Moderate space for the time
      valueGetter: (value, row) => {
        const start = format(new Date(row.startDate), "HH:mm");
        const end = format(new Date(row.endDate), "HH:mm");
        return `${start} - ${end}`;
      },
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1, // Standard space for the category
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      flex: 1, // Standard space for phone numbers
      valueGetter: (value, row) => row.patient.phoneNumber,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5, // More space for the email
      valueGetter: (value, row) => row.patient.email,
    },
    {
      field: "sex",
      headerName: "Sex",
      flex: 0.5, // Less space for sex as it is a short field
      valueGetter: (value, row) => (row.patient.sex === "Male" ? "M" : "F"),
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2, // More space for addresses as they can be long
      valueGetter: (value, row) => row.patient.address,
    },
  ];

  return (
    <>

      <div className={`w-full transition-all duration-100 ease-in-out`}>
      {open && <AddNewModal open={open} setOpen={setOpen} cellData={null} />}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <Header
            title={"Appointments"}
            subTitle={"Manage your appointments"}
          />

          <Button
            startIcon={<MdAdd />}
            onClick={handleOpen}
            variant="contained"
            sx={{ textTransform: "none" }}
            className="!bg-primary"
          >
            New Appointment
          </Button>
        </Box>

        <Box height={600}>
          <DataGrid
            rows={appointments}
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
    </>
  );
};

export default Appointments;