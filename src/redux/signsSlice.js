import { createSlice } from "@reduxjs/toolkit";

let nextId = 1;

export const signSlice = createSlice({
  name: "signs",
  initialState: {
    generalSigns: [
      {
        name: "Blood Pressure",
        placeholder: "10mm/Hg",
        unit: "mm/Hg",
        type: "text",
      },
      {
        name: "Height",
        placeholder: "170cm, 190cm...",
        unit: "cm",
        type: "number",
      },
      {
        name: "Weight",
        placeholder: "70kg, 80kg...",
        unit: "kg",
        type: "number",
      },
      {
        name: "Temperature",
        placeholder: "36.5°C",
        unit: "°C",
        type: "number",
      },
      {
        name: "Pulse",
        placeholder: "70bpm",
        unit: "bpm",
        type: "number",
      },
    ],
    otherSigns: [
      { name: "physicalSigns", placeholder: "Physical Signs" },
      { name: "functionalSigns", placeholder: "Functional Signs" },
    ],
    generalInfo: [
      { name: "diagnostic", placeholder: "Diagnostic" },
      { name: "conduits", placeholder: "Conduits a tenir" },
      { name: "consultationCause", placeholder: "Consultation Cause" },
    ],
    status: "idle",
    error: null,
  },
  reducers: {
    addSign: (state, action) => {
      const newSign = {
        id: nextId++,
        ...action.payload,
      };
      state.generalSigns.push(newSign);
    },
    updateSign: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingSign = state.generalSigns.find((sign) => sign.id === id);
      if (existingSign) {
        Object.assign(existingSign, changes);
      }
    },
    deleteSign: (state, action) => {
      const id = action.payload;
      state.generalSigns = state.generalSigns.filter((sign) => sign.id !== id);
    },
  },
});

export const { addSign, updateSign, deleteSign } = signSlice.actions;

export default signSlice.reducer;
