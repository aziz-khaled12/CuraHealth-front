import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let nextId = 1;
const token = localStorage.getItem("token");
const url = import.meta.env.VITE_BACK_END_URL;

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/All/service`);
      const services = res.data.service.map((service) => {
        return {
          id: service.ServiceID,
          name: service.NameService,
        }
      });
      console.log(services)
      return services;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const attachService = createAsyncThunk(
  "services/attachService",
  async (attachData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/api/AttatchServiceToUser`, attachData, {
        headers: { Authorization: `${token}` },
      });      
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addService: (state, action) => {
      const newService = {
        id: nextId++,
        ...action.payload,
      };
      state.services.push(newService);
    },
    updateService: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingService = state.services.find(
        (service) => service.id === id
      );
      if (existingService) {
        Object.assign(existingService, changes);
      }
    },
    deleteService: (state, action) => {
      const id = action.payload;
      state.services = state.services.filter((service) => service.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addService, updateService, deleteService } =
  serviceSlice.actions;

export default serviceSlice.reducer;
