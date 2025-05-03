import React, { useEffect, useMemo, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { CheckCircle, Cancel, Schedule } from "@mui/icons-material";
import { MdAdd } from "react-icons/md";
import AddNewModal from "../appointmentsModals/AddNewModal";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { fetchAppointments } from "../../redux/appointmentsSlice";
import useHasPermission from "../../hooks/useHasPermission";

const Appointments = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const canSeeTodayAppointments = useHasPermission(
    "see today Appointment list"
  );
  const canAddAppointments = useHasPermission("add new Appointment");
  useEffect(() => {
    if (appointments.length === 0) {
      dispatch(fetchAppointments({ today: canSeeTodayAppointments }));
    }
  }, [dispatch]);
  const { appointments } = useSelector((state) => state.appointments);


  const handleOpen = () => {
    setOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        field: "appointmnt_id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "patientName",
        headerName: "Patient",
        flex: 1.5, // More space for the patient's name
        valueGetter: (value, row) => `${row.first_name} ${row.last_name}`,
      },
      {
        field: "birth_day",
        headerName: "Birthday",
        flex: 1, // More space for the patient's name
        valueGetter: (value, row) => format(row.birth_day, "yyyy-MM-dd"),
      },
      
      {
        field: "created_at",
        headerName: "Created At",
        flex: 1.5, // Standard space for the date
        valueGetter: (value, row) => format(row.created_at, "yyyy-MM-dd hh:mm a"),
      },
     
      {
        field: "name_category",
        headerName: "Category",
        flex: 1, // Standard space for the category
      },
      {
        field: "phone_num",
        headerName: "Phone",
        flex: 1, // Standard space for phone numbers
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1.5, // More space for the email
      },
      {
        field: "doctor_name",
        headerName: "Doctor",
        flex: 1, // More space for addresses as they can be long
      },
    ],
    []
  );

  return (
    appointments && (
      <>
        <div className="flex flex-col h-full w-full">
          {open && (
            <AddNewModal open={open} setOpen={setOpen} cellData={null} />
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginBottom: "1rem",
            }}
          >
            {/* <Header
              title={"Appointments"}
              subTitle={"Manage your appointments"}
            /> */}
            {canAddAppointments && (
              <Button
                startIcon={<MdAdd />}
                onClick={handleOpen}
                variant="contained"
                sx={{ textTransform: "none" }}
                className="!bg-primary"
              >
                New Appointment
              </Button>
            )}
          </Box>

          <Box className="flex-grow w-full h-full">
            {appointments && (
              <DataGrid
                rows={appointments}
                slots={{ toolbar: GridToolbar }}
                columns={columns}
                autoPageSize
                getRowId={(row) => row.appointmnt_id}
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
        </div>
      </>
    )
  );
};

export default Appointments;
