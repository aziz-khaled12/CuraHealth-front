import React, { useEffect, useState } from "react";
import Header from "../Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import { MdAdd } from "react-icons/md";
import AddNewModal from "../patientsModals/AddNewModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../redux/patientsSlice";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ModifyModal from "../patientsModals/ModifyModal";

const Patients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false)
  const { patients } = useSelector((state) => state.patients);
  const [dataToEdit, setDataToEdit] = useState()

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
          <IconButton color="primary" onClick={() => handleModify(params.row.PatientID)}>
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

  const handleModify = (prevData) => {
    // const selectedPatient = patients.filter(patient => patient.id = prevData)
    setDataToEdit(fakePatient[0])
    setEditOpen(true)
  }

  function getRowId(row) {
    return row.PatientID;
  }

  const fakePatient = [
    {
      PatientID: "1",
      FirstName: "Khaled",
      LastName: "Abd Elaziz",
      BirthDay: new Date(2005, 4, 10),
      Address: "Logs 150",
      Email: "khaledaziz@yahoo.com",
      IDNum: "98645132",
      PhoneNum: "0561036105",
      City: "Bir-El-Ater",
      EtatCivil: "Single",
      BloodType: "O+",
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
      {editOpen && dataToEdit && <ModifyModal open={editOpen} setOpen={setEditOpen} prevData={dataToEdit} />}
    </div>
  );
};

export default Patients;
