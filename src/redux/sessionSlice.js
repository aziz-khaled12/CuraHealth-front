import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessions: [],
  status: "idle",
  error: null,
};

export const sessionSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    createSession: (state, action) => {
      state.sessions.push(action.payload);
    },
    deleteSession: (state, action) => {
      state.sessions = state.sessions.filter((session) => session.sessionId !== action.payload);
    },
    modifySession: (state, action) => {
      console.log("payload: ", action.payload)
        const { sessionId, field, value, nestedField, nestedValue } = action.payload;
        const sessionToUpdate = state.sessions.find((session) => session.sessionId === sessionId);
        if (sessionToUpdate) {
          if (nestedField) {
            sessionToUpdate[field][nestedField] = nestedValue;
          } else {
            sessionToUpdate[field] = value;
          }
        }
      },
  },
});

export const { createSession, deleteSession, modifySession } = sessionSlice.actions;


export default sessionSlice.reducer;