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
      let appointmentStatus = [];
      let patientStatus = [];

      statuses.forEach((status) => {
        if (status?.Info.target === "appointment") {
          appointmentStatus.push({
            id: status.StatusID,
            name: status.StatusName,
            type: status.StatusDataType,
            placeholder: status.Info?.placeholder || "",
            unit: status.Info?.unit || "",
          });
        } else if (status?.Info.target === "patient") {
          patientStatus.push({
            id: status.StatusID,
            name: status.StatusName,
            type: status.StatusDataType,
            data: status.Info?.data || "",
          });
        }
      });

      return { appointmentStatus, patientStatus };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Something went wrong"
      );
    }
  }
);

export const addSign = createAsyncThunk(
  "signs/addSign",
  async ({ newSign }, { rejectWithValue }) => {
    try {
      const req = {
        StatusName: newSign.name,
        StatusDataType: newSign.type,
        Info: JSON.stringify({
          target: "appointment",
          unit: newSign.unit,
          placeholder: newSign.placeholder,
        }),
      };
      const res = await axios.post(`${url}/api/StatusType`, req);
      const sign = {
        id: res.data.StatusID,
        name: res.data.StatusName,
        type: res.data.StatusDataType,
        placeholder: res.data.Info?.placeholder || "",
        unit: res.data.Info?.unit || "",
      };
      return sign;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to add sign");
    }
  }
);

export const updateSign = createAsyncThunk(
  "signs/updateSign",
  async ({ newSign, id, type }, { rejectWithValue }) => {
    try {
      const req = {
        StatusName: newSign.name,
        StatusDataType: newSign.type.trim(),
        Info: JSON.stringify({
          target: type,
          unit: newSign.unit,
          placeholder: newSign.placeholder,
        }),
      };
      const res = await axios.put(`${url}/api/StatusType/${id}`, req);
      let sign = {}

      if(type === "appointment") {
        sign = {
        id: res.data.StatusType.StatusID,
        name: res.data.StatusType.StatusName,
        type: res.data.StatusType.StatusDataType,
        placeholder: res.data.StatusType.Info?.placeholder || "",
        unit: res.data.StatusType.Info?.unit || "",
      };
      } else if(type === "patient") {
        sign = {
          id: res.data.StatusID,
          name: res.data.StatusName,
          type: res.data.StatusDataType,
          data: res.data.Info?.data || [],
        };
      }
      
      return { sign, id };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to add sign");
    }
  }
);

export const addPatientSign = createAsyncThunk(
  "signs/addPatientSign",
  async ({ data }, { rejectWithValue }) => {
    try {
      const req = {
        PatientID: sign.patientId,
        StatusID: sign.statusId,
        value: data.value
      };
      const res = await axios.put(`${url}api/AttatchStatusToPatient`, req);
      const sign = {
        id: res.data.StatusID,
        name: res.data.StatusName,
        type: res.data.StatusDataType,
        data: res.data.Info?.data || [],
      };
      return sign;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to add sign");
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
    deleteSign: (state, action) => {
      const id = action.payload;
      state.generalSigns = state.generalSigns.filter((sign) => sign.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVitals.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action.payload);
        state.generalSigns = action.payload.appointmentStatus;
        state.patientSigns = action.payload.patientStatus;
      })

      .addCase(updateSign.fulfilled, (state, action) => {
        state.status = "success";
        const { id, sign } = action.payload;
        const signIndex = state.generalSigns.findIndex(
          (sign) => sign.id === id
        );
        if (signIndex !== -1) {
          state.generalSigns[signIndex] = sign;
        }
      })

      .addCase(addSign.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action.payload);
        state.generalSigns.push(newSign);
      })
      

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { deleteSign } = signSlice.actions;

export default signSlice.reducer;
