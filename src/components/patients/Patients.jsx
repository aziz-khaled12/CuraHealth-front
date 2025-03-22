import React, { useEffect, useMemo, useState } from "react";
import Header from "../random/Header";
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
import useHasPermission from "../../hooks/useHasPermission";

const Patients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { patients } = useSelector((state) => state.patients);
  const [dataToEdit, setDataToEdit] = useState();

  const canAddPatient = useHasPermission("add Patient");
  const canModifyPatient = useHasPermission("modify Patient details");
  const canRemovePatient = useHasPermission("remove Patient");
  const canSeePatientDetails = useHasPermission("see Patient details");

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        valueGetter: (value, row) => {
          return `${row.PatientID}`;
        },
        flex: 1,
      }, // Smaller flex for ID
      {
        field: "fullName",
        headerName: "Full Name",
        valueGetter: (value, row) => {
          return `${row.FirstName || ""} ${row.LastName || ""}`;
        },
        flex: 1.5,
      },
      {
        field: "BirthDay",
        headerName: "Birthday",
        valueGetter: (value) => format(value, "yyyy-MM-dd"),
        flex: 1,
      },
      { field: "Address", headerName: "Address", flex: 2 },
      { field: "Email", headerName: "Email", flex: 1.5 },
      { field: "PhoneNum", headerName: "Phone Number", flex: 1 },
      {
        field: "Sex",
        headerName: "Sex",

        flex: 0.5,
      },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        sortable: false,
        renderCell: (params) => (
          <>
            {canModifyPatient && (
              <IconButton
                color="primary"
                onClick={() => handleModify(params.row.PatientID)}
              >
                <EditIcon />
              </IconButton>
            )}

            {canRemovePatient && (
              <IconButton
                color="secondary"
                onClick={() => handleDelete(params.row)}
              >
                <DeleteIcon />
              </IconButton>
            )}

            {canSeePatientDetails && (
              <IconButton
                color="info"
                onClick={() => handleDetails(params.row.PatientID)}
              >
                <InfoIcon />
              </IconButton>
            )}
          </>
        ),
      },
    ],
    []
  );

  const handleDetails = (patientID) => {
    navigate(`/patients/${patientID}`);
  };

  useEffect(() => {
    if (patients.length === 0) {
      dispatch(fetchPatients());
    }
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleModify = (prevData) => {
    const selectedPatient = patients.filter(
      (patient) => patient.id == prevData
    );
    setDataToEdit(selectedPatient);
    setEditOpen(true);
  };

  function getRowId(row) {
    return row.PatientID;
  }

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
        {canAddPatient && (
          <Button
            startIcon={<MdAdd />}
            onClick={handleOpen}
            variant="contained"
            sx={{ textTransform: "none" }}
            className="!bg-primary"
          >
            New Patient
          </Button>
        )}
      </Box>
      <Box height={600}>
        {patients && (
          <DataGrid
            rows={patients}
            getRowId={getRowId}
            slots={{ toolbar: GridToolbar }}
            columns={columns}
            autoPageSize
          />
        )}
      </Box>
      {open && canAddPatient && <AddNewModal open={open} setOpen={setOpen} />}
      {canModifyPatient && editOpen && dataToEdit && (
        <ModifyModal
          open={editOpen}
          setOpen={setEditOpen}
          prevData={dataToEdit}
        />
      )}
    </div>
  );
};

export default Patients;
