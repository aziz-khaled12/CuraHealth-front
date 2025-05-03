import React, { useEffect, useMemo, useState } from "react";
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
  
  // Reference for parent container height calculation
  const [containerRef, setContainerRef] = useState(null);

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
    [canModifyPatient, canRemovePatient, canSeePatientDetails]
  );

  const handleDetails = (patientID) => {
    navigate(`/patients/${patientID}`);
  };

  const handleDelete = (row) => {
    // Implement delete functionality
    console.log("Delete:", row);
  };

  useEffect(() => {
    if (patients.length === 0) {
      dispatch(fetchPatients());
    }
  }, [dispatch, patients.length]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleModify = (patientID) => {
    setDataToEdit(patientID);
    setEditOpen(true);
  };

  function getRowId(row) {
    return row.PatientID;
  }

  return (
    <div className="flex flex-col h-full w-full" ref={setContainerRef}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          marginBottom: "1rem",
        }}
        className="flex-shrink-0"
      >
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
      
      {/* Responsive DataGrid container */}
      <Box className="flex-grow w-full h-full">
        {patients && (
          <DataGrid
            rows={patients}
            getRowId={getRowId}
            slots={{ toolbar: GridToolbar }}
            columns={columns}
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
        )}
      </Box>
      
      {open && canAddPatient && <AddNewModal open={open} setOpen={setOpen} />}
      {canModifyPatient && editOpen && dataToEdit && (
        <ModifyModal
          open={editOpen}
          setOpen={setEditOpen}
          patientId={dataToEdit}
        />
      )}
    </div>
  );
};

export default Patients;