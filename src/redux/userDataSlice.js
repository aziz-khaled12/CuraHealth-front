import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACK_END_URL;



// Async action for fetch Types
export const fetchTypes = createAsyncThunk(
  'userData/fetchTypes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/All/Types`);
      console.log(res)
      const { types } = res.data;
      return { types };
    } catch (err) {
      const errorMessage =
        err.response && err.response.status === 401 ? "Something went wrong" : "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);


// Auth Slice
const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userDataStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    types: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.status = "pending"
        state.error = null;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = "success"
        state.types = action.payload.types;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload;
      })
  },
});


export default userDataSlice.reducer;
