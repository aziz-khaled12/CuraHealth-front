import { createSlice } from "@reduxjs/toolkit";

let nextId = 1;

export const factureSlice = createSlice({
  name: "factures",
  initialState: {
    factures: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addFacture: (state, action) => {
      const newFacture = {
        id: nextId++,
        ...action.payload,
      };
      state.factures.push(newFacture);
    },
    updateFacture: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingFacture = state.factures.find(facture => facture.id === id);
      if (existingFacture) {
        Object.assign(existingFacture, changes);
      }
    },
    deleteFacture: (state, action) => {
      const id = action.payload;
      state.factures = state.factures.filter(facture => facture.id !== id);
    },
  },
});

export const { addFacture, updateFacture, deleteFacture } = factureSlice.actions;

export default factureSlice.reducer;