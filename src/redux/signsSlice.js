import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let nextId = 1;
const url = import.meta.env.VITE_BACK_END_URL;

export const fetchVitals = createAsyncThunk(
  "signs/fetchVitals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/StatusType`);
      const statuses = res.data.status;
      console.log("general Signs", generalSigns);
      let appointmentStatus = [];
      let patientStatus = [];

      statuses.forEach((status) => {
        if (status?.Info.target === "Appointment") {
          appointmentStatus.push({
            id: status.StatusID,
            name: status.StatusName,
            type: status.StatusDataType,
            placeholder: status.Info?.placeholder || "",
            unit: status.Info?.unit || "",
          });
        } else if (status?.Info.target === "Patient") {
          patientStatus.push({
            id: status.StatusID,
            name: status.StatusName,
            type: status.StatusDataType,
            unit: status.Info?.unit || "",
          });
        }
      });
      
     

      return {appointmentStatus, patientStatus};
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Something went wrong"
      );
    }
  }
);



export const signSlice = createSlice({
  name: "signs",
  initialState: {
    generalSigns: [],
    patientSigns: [],
    unites: [],
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchVitals.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.generalSigns = action.payload.appointmentStatus;
        state.patientSigns = action.payload.patientStatus;
      })
      .addCase(fetchVitals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVitals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

      
  },
});

export const { addSign, updateSign, deleteSign } = signSlice.actions;

export default signSlice.reducer;
