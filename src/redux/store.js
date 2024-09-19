import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './Appointments/appointmentsSlice.js';
import authReducer from './authSlice.js'
import userDataReducer from './userDataSlice.js'


export const store = configureStore({
    reducer: {
     appointments: appointmentsReducer,
     auth: authReducer,
     userData: userDataReducer
    },
  });