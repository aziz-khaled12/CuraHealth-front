import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACK_END_URL;

const normalizeData = (data, idKey, nameKey) =>
  data.map((item) => ({
    id: item[idKey],
    name: item[nameKey],
  }));

export const fetchAppointmentsData = createAsyncThunk(
  "appointmentsData/fetchAppointmentsData",
  async (_, { rejectWithValue }) => {
    try {
      const [
        motifs,
        singePhysic,
        diagnostic,
        singeFunctionnal,
        medicaments,
        unites,
      ] = await Promise.all([
        axios.get(`${url}/api/All/Motifs`),
        axios.get(`${url}/api/All/SingePhysic`),
        axios.get(`${url}/api/All/Diagnostic`),
        axios.get(`${url}/api/All/SingeFunctionnal`),
        axios.get(`${url}/api/All/DWA`),
        axios.get(`${url}/api/All/unite`),
      ]);

      return {
        consultationCauses: normalizeData(
          motifs.data.motifs,
          "MotifsID",
          "NameMotifs"
        ),
        physicalSigns: normalizeData(
          singePhysic.data.singe_Physic,
          "SingePhysicID",
          "NameSingePhysic"
        ),
        diagnoses: normalizeData(
          diagnostic.data.diagnostics,
          "DiagnosticID",
          "NameDiagnostic"
        ),
        functionalSigns: normalizeData(
          singeFunctionnal.data.singe_functionnal,
          "SingeFunctionnalID",
          "NameSingeFunctionnal"
        ),
        unites: normalizeData(unites.data.unites, "UniteID", "NameUnite"),
        medicaments: medicaments.data.DWAs,
      };
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const addNewMedicament = createAsyncThunk(
  "appointmentsData/addNewMedicament",
  async (newMedicament, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/api/DWA`, {
        NameDWA: newMedicament,
      });
      return res.data.dwa;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const addNewAppointmentData = createAsyncThunk(
  "appointmentsData/addNewAppointmentData",
  async ({ type, data }, { rejectWithValue }) => {
    try {
      const getNameKey = (type) => {
        const nameKeyMap = {
          Motifs: "NameMotifs",
          SingePhysic: "NameSingePhysic",
          Diagnostic: "NameDiagnostic",
          SingeFunctionnal: "NameSingeFunctionnal",
        };
        return nameKeyMap[type];
      };
      const getIdKey = (type) => {
        const idKeyMap = {
          Motifs: "MotifsID",
          SingePhysic: "SingePhysicID",
          Diagnostic: "DiagnosticID",
          SingeFunctionnal: "SingeFunctionnalID",
        };
        return idKeyMap[type];
      };

      const propertyName = getNameKey(type);
      const idKey = getIdKey(type);
      const requestBody = {
        [propertyName]: data,
      };
      const res = await axios.post(`${url}/api/${type}`, requestBody);
      const newData = normalizeData([res.data], idKey, propertyName);
      return { data: newData, type };
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
    unites: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentsData.fulfilled, (state, action) => {
        state.status = "success";
        state.consultationCauses = action.payload.consultationCauses;
        state.physicalSigns = action.payload.physicalSigns;
        state.diagnoses = action.payload.diagnoses;
        state.functionalSigns = action.payload.functionalSigns;
        state.medicaments = action.payload.medicaments;
        state.unites = action.payload.unites;
      })
      .addCase(fetchAppointmentsData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAppointmentsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addNewMedicament.fulfilled, (state, action) => {
        state.status = "success";
        state.medicaments.push(action.payload);
      })
      .addCase(addNewMedicament.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewMedicament.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addNewAppointmentData.fulfilled, (state, action) => {
        state.status = "success";
        // Depending on the type, you might want to update a specific array
        if (action.payload.type === "Motifs") {
          state.consultationCauses.push(action.payload.data);
        } else if (action.payload.type === "SingePhysic") {
          state.physicalSigns.push(action.payload.data);
        } else if (action.payload.type === "Diagnostic") {
          state.diagnoses.push(action.payload.data);
        } else if (action.payload.type === "SingeFunctionnal") {
          state.functionalSigns.push(action.payload.data);
        }
      })
      .addCase(addNewAppointmentData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewAppointmentData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default appointmentsDataSlice.reducer;
