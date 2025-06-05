import React, { useState, useCallback, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  DayView,
  DateNavigator,
  Appointments,
  DragDropProvider,
  Toolbar,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  updateAppointment,
  deleteAppointment,
  fetchAppointments,
} from "../../redux/appointmentsSlice";
import AddNewModal from "../appointmentsModals/AddNewModal";
import ModifyModal from "../appointmentsModals/ModifyModal";
import { isNullTime } from "../../utils/TimeManipulationFunctions";

const Calendar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppointments({ today: true }));
  }, []);

  const appointments = useSelector((state) =>
    state.appointments.appointments.map((appointment) => ({
      id: appointment.appointmnt_id,
      ...appointment,
      title: `${appointment.first_name} ${appointment.last_name}`,
      startDate:
        appointment.start_time && isNullTime(appointment.start_time)
          ? new Date(new Date(appointment.for_time).getTime() - 30 * 60 * 1000)
          : new Date(appointment.start_time),
      endDate:
        appointment.end_time && isNullTime(appointment.end_time)
          ? new Date(appointment.for_time)
          : new Date(appointment.end_time),
    }))
  );

  const [open, setOpen] = useState(false);
  const [cellData, setCellData] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  const [editingOptions] = useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const { allowUpdating, allowResizing, allowDragging } = editingOptions;

  const handleOpen = (cellData) => {
    setCellData(cellData);
    setOpen(true);
  };

  const handleEditOpen = (cellData) => {
    setCellData(cellData);
    setEditOpen(true);
  };

  const Appointment = ({ children, ...restProps }) => (
    <Appointments.Appointment
      style={{ backgroundColor: "#0D3B66" }}
      onDoubleClick={() => {
        handleOpen(restProps.data);
      }}
      {...restProps}
    >
      {children}
    </Appointments.Appointment>
  );
  const customAppointmentTooltip = ({ children, ...restProps }) => (
    <AppointmentTooltip.Layout
      {...restProps}
      onOpenButtonClick={() => {
        handleEditOpen(restProps.appointmentMeta.data);
      }}
    >
      {children}
    </AppointmentTooltip.Layout>
  );

  const allowDrag = useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating]
  );
  const allowResize = useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating]
  );

  const onCommitChanges = useCallback(
    ({ added, changed, deleted }) => {
      console.log("onCommitChanges", { added, changed, deleted });
      if (added) {
        const appointmentData = {
          title: added.title,
          startDate: added.startDate.toLocalString(),
          endDate: added.endDate.toLocalString(),
        };
      }
      if (changed) {
        Object.entries(changed).forEach(([id, changes]) => {
          const serializedChanges = { id };

          // Process startDate
          if (changes.startDate instanceof Date) {
            console.log("Start date:", changes.startDate);
            serializedChanges.startDate = changes.startDate.toISOString();
            // Or use toLocaleString() if you prefer local format:
            // serializedChanges.startDate = changes.startDate.toLocaleString();
          }

          // Process endDate
          if (changes.endDate instanceof Date) {
            console.log("End date:", changes.endDate);
            serializedChanges.endDate = changes.endDate.toISOString();
            // Or use toLocaleString() if you prefer local format:
            // serializedChanges.endDate = changes.endDate.toLocaleString();
          }

          // Process title
          if (changes.title && typeof changes.title === "string") {
            const title = changes.title.trim();
            if (title) {
              serializedChanges.title = title;
              console.log("Title:", title);
            }
          }

          // Only dispatch if there are valid changes beyond just the id
          if (Object.keys(serializedChanges).length > 1) {
            console.log("Dispatching update:", serializedChanges);
            dispatch(updateAppointment(serializedChanges));
          }
        });
      }
      if (deleted !== undefined) {
        dispatch(deleteAppointment(deleted));
      }
    },
    [dispatch]
  );

  const TimeTableCell = useCallback(
    memo(({ onDoubleClick, ...restProps }) => (
      <DayView.TimeTableCell
        {...restProps}
        onDoubleClick={() => handleOpen(restProps)}
      />
    )),
    []
  );

  useEffect(() => {
    console.log("appointments: ", appointments);
  }, [appointments]);

  return (
    appointments.length > 0 && (
      <React.Fragment>
        <Paper sx={{ height: "100%" }}>
          <Scheduler data={appointments} height={"auto"}>
            <ViewState />
            <EditingState onCommitChanges={onCommitChanges} />
            <IntegratedEditing />
            <Toolbar />
            <DateNavigator />
            <DayView
              startDayHour={9}
              endDayHour={23}
              timeTableCellComponent={TimeTableCell}
            />
            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip
              showDeleteButton
              showOpenButton
              layoutComponent={customAppointmentTooltip}
            />
            <DragDropProvider allowDrag={allowDrag} allowResize={allowResize} />
          </Scheduler>
        </Paper>

        {cellData && open && (
          <AddNewModal open={open} setOpen={setOpen} cellData={cellData} />
        )}
        {cellData && editOpen && (
          <ModifyModal
            open={editOpen}
            setOpen={setEditOpen}
            cellData={cellData}
          />
        )}
      </React.Fragment>
    )
  );
};

export default Calendar;
