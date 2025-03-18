import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessions: [],
  vitals: [],
  diagnoses: [],
  medicaments: [],
  physicalSigns: [],
  functionalSigns: [],
  consultationCauses: [],
};

const sessionSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    addSession: (state, action) => {
      const { sessionId, sessionData } = action.payload;

      console.log(action.payload);

      // Initialize each category with an empty data array for the new session
      state.sessions.push(sessionData);
      state.vitals.push({ sessionId, data: [] });
      state.diagnoses.push({ sessionId, data: [] });
      state.medicaments.push({ sessionId, data: [] });
      state.physicalSigns.push({ sessionId, data: [] });
      state.functionalSigns.push({ sessionId, data: [] });
      state.consultationCauses.push({ sessionId, data: [] });
    },

    deleteSession: (state, action) => {
      const sessionId = action.payload;

      // Remove session data from each category
      state.sessions = state.sessions.filter(
        (s) => s.sessionId !== sessionId
      );
      state.diagnoses = state.diagnoses.filter(
        (s) => s.sessionId !== sessionId
      );
      state.medicaments = state.medicaments.filter(
        (s) => s.sessionId !== sessionId
      );
      state.physicalSigns = state.physicalSigns.filter(
        (s) => s.sessionId !== sessionId
      );
      state.functionalSigns = state.functionalSigns.filter(
        (s) => s.sessionId !== sessionId
      );
      state.consultationCauses = state.consultationCauses.filter(
        (s) => s.sessionId !== sessionId
      );
    },

    updateSessionAttribute: (state, action) => {
      const { sessionId, category, newData } = action.payload;
      console.log(action.payload);
      const categoryArray = state[category];

      console.log(categoryArray)

      if (categoryArray) {
        const sessionIndex = categoryArray.findIndex(
          (s) => s.sessionId === sessionId
        );

        if (sessionIndex !== -1) {
          // Update only the data array of the specific session in the category
          categoryArray[sessionIndex].data = newData;
          console.log("categoryArray: ", categoryArray);
        } else {
          // If session doesn't exist in that category, create a new entry
          categoryArray.push({ sessionId, data: newData });
        }
      }
    },
  },
});

export const { addSession, deleteSession, updateSessionAttribute } =
  sessionSlice.actions;
export default sessionSlice.reducer;
