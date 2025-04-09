import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "./appointmentsSlice.js";
import authReducer from "./authSlice.js";
import userDataReducer from "./userDataSlice.js";
import patientsReducre from "./patientsSlice.js";
import servicesReducer from "./servicesSlice.js";
import tasksReducer from "./tasksSlice.js";
import signsReducer from "./signsSlice.js";
import sessionReducer from "./sessionSlice.js";
import appointmentsDataReducer from "./appointmentDataSlice.js";
import usersReducer from "./usersSlice.js";

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    appointmentsData: appointmentsDataReducer,
    auth: authReducer,
    patients: patientsReducre,
    userData: userDataReducer,
    services: servicesReducer,
    tasks: tasksReducer,
    signs: signsReducer,
    sessions: sessionReducer,
    users: usersReducer,
  },
});

export default store;
