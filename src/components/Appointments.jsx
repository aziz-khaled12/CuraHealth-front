import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { CheckCircle, Cancel, Schedule } from "@mui/icons-material";
import { MdAdd } from "react-icons/md";
import AddNewModal from "./Appointments/AddNewModal";
import Calendar from "./Calendar";
import Header from "./Header";

const Appointments = () => {
  const [open, setOpen] = useState(false);
  // Fake rows data
  const initialRows = [
    {
      id: 1,
      time: "10:00 - 10:30",
      name: "John Doe",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Scheduled",
    },
    {
      id: 2,
      time: "11:00 - 11:30",
      name: "Jane Smith",
      category: "Normal",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 3,
      time: "12:00 - 12:30",
      name: "Tom Hanks",
      category: "Family",
      doctor: "Ahmed Twati",
      status: "Canceled",
    },
    {
      id: 4,
      time: "13:00 - 13:30",
      name: "Emma Watson",
      category: "Friend",
      doctor: "Ahmed Twati",
      status: "Scheduled",
    },
    {
      id: 5,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 6,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 7,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 8,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 9,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 10,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 11,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 12,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 13,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 14,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 15,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 16,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 17,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 18,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 19,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 20,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 21,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 22,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 23,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 24,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 25,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 26,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
    {
      id: 27,
      time: "14:00 - 14:30",
      name: "Bruce Wayne",
      category: "Emergency",
      doctor: "Ahmed Twati",
      status: "Visited",
    },
  ];

  const [rows, setRows] = useState(initialRows);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter rows based on search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredRows = initialRows.filter(
      (row) =>
        row.name.toLowerCase().includes(query) ||
        row.doctor.toLowerCase().includes(query)
    );
    setRows(filteredRows);
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

  // Columns for the DataGrid
  const columns = [
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      sortable: true,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: false,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      sortable: false,
    },
    {
      field: "doctor",
      headerName: "Doctor",
      flex: 1,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          {getStatusIcon(params.value)}
          <span style={{ marginLeft: 8 }}>{params.value}</span>
        </Box>
      ),
    },
  ];

  return (
    <div className={`w-full transition-all duration-100 ease-in-out`}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px"
        }}
      >
        <Header title={"Appointments"} subTitle={"Manage your appointments"} />

        <Button
          startIcon={<MdAdd />}
          onClick={() => {
            setOpen(true);
          }}
          variant="contained"
          sx={{ textTransform: "none" }}
          className="!bg-primary"
        >
          New Appointment
        </Button>
      </Box>

      <Box height={600}>
        <DataGrid
          rows={rows}
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

      {/* <Calendar></Calendar> */}

      <AddNewModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Appointments;
