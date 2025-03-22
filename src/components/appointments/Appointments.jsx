import React, { useEffect, useMemo, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { CheckCircle, Cancel, Schedule } from "@mui/icons-material";
import { MdAdd } from "react-icons/md";
import AddNewModal from "../appointmentsModals/AddNewModal";
import Header from "../random/Header";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { fetchAppointments } from "../../redux/appointmentsSlice";
import useHasPermission from "../../hooks/useHasPermission";

const Appointments = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);
  const canSeeTodayAppointments = useHasPermission(
    "see today Appointment list"
  );
  const canAddAppointments = useHasPermission("add new Appointment");
  useEffect(() => {
    if (appointments.length === 0) {
      dispatch(fetchAppointments({ today: canSeeTodayAppointments }));
    }
  }, [dispatch]);

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
        headerName: "Patient Name",
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
        field: "date",
        headerName: "Date",
        flex: 1, // Standard space for the date
        valueGetter: (value, row) => format(row.created_at, "yyyy-MM-dd"),
      },
      {
        field: "created_at",
        headerName: "Time",
        flex: 1, // Moderate space for the time
        valueGetter: (value, row) => format(row.created_at, "hh:mm a"),
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
        <div className={`w-full transition-all duration-100 ease-in-out`}>
          {open && (
            <AddNewModal open={open} setOpen={setOpen} cellData={null} />
          )}
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

          <Box sx={{ height: "69vh" }}>
            {appointments && (
              <DataGrid
                rows={appointments}
                slots={{ toolbar: GridToolbar }}
                columns={columns}
                autoPageSize
                getRowId={(row) => row.appointmnt_id}
              />
            )}
          </Box>
        </div>
      </>
    )
  );
};

export default Appointments;
