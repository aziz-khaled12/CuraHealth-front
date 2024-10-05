import React, { useEffect, useState } from "react";
import Header from "../Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import { MdAdd } from "react-icons/md";
import AddNewModal from "../patientsModals.jsx/AddNewModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../redux/patientsSlice";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { patients } = useSelector((state) => state.patients);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      valueGetter: (value, row) => {
        return `${row.PatientID}`;
      },
      flex: 1,
    }, // Smaller flex for ID
    {
      field: "FullName",
      headerName: "Full Name",
      valueGetter: (value, row) => {
        return `${row.FirstName || ""} ${row.LastName || ""}`;
      },
      flex: 1.5,
    },
    {
      field: "BirthDay",
      headerName: "Birthday",
      valueGetter: (value) => format(new Date(value), "yyyy-MM-dd"),
      flex: 1,
    },
    { field: "Address", headerName: "Address", flex: 2 },
    { field: "Email", headerName: "Email", flex: 1.5 },
    { field: "PhoneNum", headerName: "Phone Number", flex: 1 },
    {
      field: "Sex",
      headerName: "Sex",
      valueGetter: (value) => {
        return value === 1 ? "M" : "F";
      },
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleModify(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="info"
            onClick={() => handleDetails(params.row.PatientID)}
          >
            <InfoIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDetails = (patientID) => {
    navigate(`/patients/${patientID}`);
  };

  useEffect(() => {
    dispatch(fetchPatients());
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  function getRowId(row) {
    return row.PatientID;
  }

  const fakePatient = [
    {
      PatientID: "1",
      FirstName: "John",
      LastName: "Doe",
      BirthDay: new Date(2005, 4, 10),
      Address: "123 Elm Street, Springfield, IL",
      Email: "john.doe@example.com",
      PhoneNum: "0561036105",
      Sex: 1,
    },
  ];

  return (
    <div>
      {" "}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Header title={"Patients"} subTitle={"Add, edit or delete patients"} />

        <Button
          startIcon={<MdAdd />}
          onClick={handleOpen}
          variant="contained"
          sx={{ textTransform: "none" }}
          className="!bg-primary"
        >
          New Patient
        </Button>
      </Box>
      <Box height={600}>
        <DataGrid
          rows={fakePatient}
          getRowId={getRowId}
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
      {open && <AddNewModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Patients;
