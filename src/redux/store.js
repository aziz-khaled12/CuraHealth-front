import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './appointmentsSlice.js';
import authReducer from './authSlice.js'
import userDataReducer from './userDataSlice.js'
import patientsReducre from './patientsSlice.js'
import factureReducer from './factureSlice.js'
import tasksReducer from './tasksSlice.js'
import signsReducer from './signsSlice.js'

export const store = configureStore({
    reducer: {
     appointments: appointmentsReducer,
     auth: authReducer,
     patients: patientsReducre,
     userData: userDataReducer,
     factures: factureReducer,
     tasks: tasksReducer,
     signs: signsReducer,
    },
  });