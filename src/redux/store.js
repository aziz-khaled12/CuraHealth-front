import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './appointmentsSlice.js';
import authReducer from './authSlice.js'
import userDataReducer from './userDataSlice.js'
import patientsReducre from './patientsSlice.js'
import servicesReducer from './servicesSlice.js'
import tasksReducer from './tasksSlice.js'
import signsReducer from './signsSlice.js'

export const store = configureStore({
    reducer: {
     appointments: appointmentsReducer,
     auth: authReducer,
     patients: patientsReducre,
     userData: userDataReducer,
     services: servicesReducer,
     tasks: tasksReducer,
     signs: signsReducer,
    },
  });