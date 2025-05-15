import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { format } from "date-fns";

const url = import.meta.env.VITE_BACK_END_URL;

const token = localStorage.getItem("token");

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/All/patient`, {
        headers: { Authorization: `${token}` },
      });
      const patients = res.data.patients === null ? [] : res.data.patients;
      return patients;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const addPatient = createAsyncThunk(
  "patients/addPatients",
  async ({ patientData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/api/Patient`, patientData, {
        headers: { Authorization: `${token}` },
      });

      const patient = res.data;
      return patient;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    patients: [],
    patientStatus: "idle",
    error: null,
  },
  reducers: {
    addSession: (state, action) => {
      const { patientId, session } = action.payload;
      const patient = state.patients.find((p) => p.id === patientId);
      if (patient) {
        patient.sessions.push(session); // Append the new session
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPatient.fulfilled, (state, action) => {
        state.patientStatus = "success";
        console.log(action.payload);
        state.patients.push(action.payload);
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patientStatus = "success";
        console.log("fetch: ", action.payload);
        state.patients = action.payload;
      })

      .addMatcher(
        isAnyOf(fetchPatients.pending, addPatient.pending),
        (state) => {
          state.patientStatus = "loading";
        }
      )
      .addMatcher(
        isAnyOf(fetchPatients.rejected, addPatient.rejected),
        (state, action) => {
          state.patientStatus = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default patientsSlice.reducer; // Export the reducer as default
export const { addSession } = patientsSlice.actions; // Export actions separately
