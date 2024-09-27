import { createSlice } from "@reduxjs/toolkit";

let nextId = 1;

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addAppointment: (state, action) => {
      const newAppointment = {
        id: nextId++,
        ...action.payload,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
      state.appointments.push(newAppointment);
    },
    updateAppointment: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingAppointment = state.appointments.find(appointment => appointment.id === id);
      if (existingAppointment) {
        Object.assign(existingAppointment, changes);
      }
    },
    deleteAppointment: (state, action) => {
      const id = action.payload;
      state.appointments = state.appointments.filter(appointment => appointment.id !== id);
    },
  },
});

export const { addAppointment, updateAppointment, deleteAppointment } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;