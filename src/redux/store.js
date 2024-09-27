import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './appointmentsSlice.js';
import authReducer from './authSlice.js'
import userDataReducer from './userDataSlice.js'
import patientsReducre from './patientsSlice.js'

export const store = configureStore({
    reducer: {
     appointments: appointmentsReducer,
     auth: authReducer,
     patients: patientsReducre,
     userData: userDataReducer
    },
  });