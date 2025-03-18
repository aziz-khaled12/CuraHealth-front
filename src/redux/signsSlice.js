import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let nextId = 1;
const url = import.meta.env.VITE_BACK_END_URL;

export const fetchVitals = createAsyncThunk(
  "signs/fetchVitals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/StatusType`);
      const generalSigns = res.data.status;
      console.log("general Signs", generalSigns);

      // Transform the data back to the original format
      const formattedSigns = generalSigns.map((sign) => ({
        id: sign.StatusID,
        name: sign.StatusName,
        type: sign.StatusDataType,
        placeholder: sign.Info?.placeholder || "",
        unit: sign.Info?.unit || "",
      }));

      return formattedSigns;
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
        state.generalSigns = action.payload;
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
