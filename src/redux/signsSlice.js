import { createSlice } from "@reduxjs/toolkit";

let nextId = 1;

export const signSlice = createSlice({
  name: "signs",
  initialState: {
    signs: [
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
        name: "Blood Pressure",
        placeholder: "70bpm, 82bpm...",
        unit: "bpm",
        type: "number",
      },
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
      state.signs.push(newSign);
    },
    updateSign: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingSign = state.signs.find((sign) => sign.id === id);
      if (existingSign) {
        Object.assign(existingSign, changes);
      }
    },
    deleteSign: (state, action) => {
      const id = action.payload;
      state.signs = state.signs.filter((sign) => sign.id !== id);
    },
  },
});

export const { addSign, updateSign, deleteSign } = signSlice.actions;

export default signSlice.reducer;
