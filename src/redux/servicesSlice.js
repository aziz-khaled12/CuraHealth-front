import { createSlice } from "@reduxjs/toolkit";

let nextId = 1;

export const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [
      { id: 1, name: "Normal Appointment", price: "1500" },
      { id: 2, name: "Blood Analyzes", price: "3000" },
      { id: 3, name: "IRM", price: "4000" },
      { id: 4, name: "Radio", price: "1500" },
    ],
    status: "idle",
    error: null,
  },
  reducers: {
    addService: (state, action) => {
      const newService = {
        id: nextId++,
        ...action.payload,
      };
      state.services.push(newService);
    },
    updateService: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingService = state.services.find(
        (service) => service.id === id
      );
      if (existingService) {
        Object.assign(existingService, changes);
      }
    },
    deleteService: (state, action) => {
      const id = action.payload;
      state.services = state.services.filter((service) => service.id !== id);
    },
  },
});

export const { addService, updateService, deleteService } =
  serviceSlice.actions;

export default serviceSlice.reducer;
