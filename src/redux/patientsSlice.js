import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";

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
      console.log("entered add");

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
    patients: [
      // {
      //   id: "1",
      //   fullName: "John Doe",
      //   firstName: "John",
      //   lastName: "Doe",
      //   birthday: new Date(1985, 5, 15).toLocaleString(),
      //   address: "123 Elm Street, Springfield, IL",
      //   email: "john.doe@example.com",
      //   phoneNumber: "555-1234",
      //   sex: 1,
      //   bloodtype: "O-",
      //   etatCivil: "Single",
      //   nationalId: "986451398465",
      //   previous: 3,
      //   coming: 0,
      //   sessions: [],
      //   allergies: ["Penicillin", "Peanuts"],
      //   chronicConditions: ["Hypertension", "Asthma"],
      // },
      // {
      //   id: "2",
      //   fullName: "Jane Smith",
      //   firstName: "Jane",
      //   lastName: "Smith",
      //   birthday: new Date(1990, 10, 22).toLocaleString(),
      //   address: "456 Oak Avenue, Springfield, IL",
      //   email: "jane.smith@example.com",
      //   phoneNumber: "555-5678",
      //   sex: 0,
      //   bloodtype: "O+",
      //   etatCivil: "Single",
      //   nationalId: "986451398465",
      //   previous: 1,
      //   coming: 1,
      //   sessions: [],
      //   allergies: [],
      //   chronicConditions: [],
      // },
      // {
      //   id: "3",
      //   fullName: "Alice Johnson",
      //   firstName: "Alice",
      //   lastName: "Johnson",
      //   birthday: new Date(1982, 3, 30).toLocaleString(),
      //   address: "789 Pine Road, Springfield, IL",
      //   email: "alice.johnson@example.com",
      //   phoneNumber: "555-8765",
      //   sex: 0,
      //   bloodtype: "AB+",
      //   etatCivil: "Single",
      //   nationalId: "986451398465",
      //   previous: 6,
      //   coming: 1,
      //   sessions: [],
      //   allergies: [],
      //   chronicConditions: [],
      // },
      // {
      //   id: "4",
      //   fullName: "Bob Brown",
      //   firstName: "Bob",
      //   lastName: "Brown",
      //   birthday: new Date(1978, 7, 19).toLocaleString(),
      //   address: "101 Maple Lane, Springfield, IL",
      //   email: "bob.brown@example.com",
      //   phoneNumber: "555-4321",
      //   sex: 1,
      //   bloodtype: "B-",
      //   etatCivil: "Single",
      //   nationalId: "986451398465",
      //   previous: 9,
      //   coming: 2,
      //   sessions: [],
      //   allergies: [],
      //   chronicConditions: [],
      // },
    ],
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
        state.patientStatus = "succeeded";
        console.log(action.payload);
        state.patients.push(action.payload);
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patientStatus = "succeeded";
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