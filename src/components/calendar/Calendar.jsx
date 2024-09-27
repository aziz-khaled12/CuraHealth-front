import React, { useState, useCallback, memo, useEffect, useMemo } from "react";
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
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../redux/appointmentsSlice";
import AddNewModal from '../appointmentsModals/AddNewModal'

const Calendar = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) =>
    state.appointments.appointments.map((appointment) => ({
      ...appointment,
      startDate: new Date(appointment.startDate),
      endDate: new Date(appointment.endDate),
    }))
  );

  useEffect(() => {
    console.log(appointments);
  }, [appointments]);

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
    setEditOpen(true);
  };

  const Appointment = ({ children, ...restProps }) => (
    <Appointments.Appointment
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
      if (added) {
        const appointmentData = {
          title: added.title,
          startDate: added.startDate.toISOString(),
          endDate: added.endDate.toISOString(),
        };
      }
      if (changed) {
        Object.entries(changed).forEach(([id, changes]) => {
          const serializedChanges = {};
          if (changes.startDate) {
            serializedChanges.startDate = changes.startDate.toISOString();
          }
          if (changes.endDate) {
            serializedChanges.endDate = changes.endDate.toISOString();
          }
          if (changes.title) {
            serializedChanges.title = changes.title;
          }
          dispatch(updateAppointment({ id: Number(id), ...serializedChanges }));
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

  return (
    <React.Fragment>
      <Paper>
        <Scheduler data={appointments} height={720}>
          <ViewState />
          <EditingState onCommitChanges={onCommitChanges} />
          <IntegratedEditing />
          <Toolbar />
          <DateNavigator />
          <DayView
            startDayHour={9}
            endDayHour={19}
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
    </React.Fragment>
  );
};

export default Calendar;
