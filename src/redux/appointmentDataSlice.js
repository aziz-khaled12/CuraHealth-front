import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let nextId = 1;
const token = localStorage.getItem("token");
const url = import.meta.env.VITE_BACK_END_URL;

export const fetchAppointmentsData = createAsyncThunk(
  "appointmentsData/fetchAppointmentsData",
  async (_, { rejectWithValue }) => {
    try {
      const [motifs, singePhysic, diagnostic, singeFunctionnal, medicaments] =
        await Promise.all([
          axios.get(`${url}/api/All/Motifs`),
          axios.get(`${url}/api/All/SingePhysic`),
          axios.get(`${url}/api/All/Diagnostic`),
          axios.get(`${url}/api/All/SingeFunctionnal`),
          axios.get(`${url}/api/All/DWA`),
        ]);

        console.log(singeFunctionnal.data.singe_functionnal);

      const normalizeData = (data, idKey, nameKey) =>
        data.map((item) => ({
          id: item[idKey],
          name: item[nameKey],
        }));

      return {
        consultationCauses: normalizeData(motifs.data.motifs, "MotifsID", "NameMotifs"),
        physicalSigns: normalizeData(singePhysic.data.singe_Physic, "SingePhysicID", "NameSingePhysic"),
        diagnoses: normalizeData(diagnostic.data.diagnostics, "DiagnosticID", "NameDiagnostic"),
        functionalSigns: normalizeData(singeFunctionnal.data.singe_functionnal, "SingeFunctionnalID", "NameSingeFunctionnal"),
        medicaments: medicaments.data.DWAs,
      };
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const appointmentsDataSlice = createSlice({
  name: "appointmentsData",
  initialState: {
    consultationCauses: [],
    physicalSigns: [],
    diagnoses: [],
    functionalSigns: [],
    medicaments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.consultationCauses = action.payload.consultationCauses;
        state.physicalSigns = action.payload.physicalSigns;
        state.diagnoses = action.payload.diagnoses;
        state.functionalSigns = action.payload.functionalSigns;
        state.medicaments = action.payload.medicaments;
      })
      .addCase(fetchAppointmentsData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAppointmentsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default appointmentsDataSlice.reducer;
