import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let nextId = 1;
const token = localStorage.getItem("token");
const url = import.meta.env.VITE_BACK_END_URL;

export const fetchRecords = createAsyncThunk(
  "records/fetchRecords",
  async (patientId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/HstoricalRecored?patientId=${patientId}`);
      console.log(res)
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);


export const recordSlice = createSlice({
  name: "records",
  initialState: {
    records: [],
    status: "idle",
    error: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records = action.payload;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});



export default recordSlice.reducer;
