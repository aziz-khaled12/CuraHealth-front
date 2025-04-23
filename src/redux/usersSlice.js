import { idID } from "@mui/material/locale";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACK_END_URL;

const prepareUserData = (user) => {
  return {
    id: user.UserID,
    userName: user.Name,
    email: user.Email,
    type: user.TypeName,
    specialization: "",
    licenseNumber: "",
  };
};
// Async action for fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/All/user`);
      const users = res.data.USERS.map((user) => prepareUserData(user));
      console.log(users);
      return users;
    } catch (err) {
      const errorMessage =
        err.response && err.response.status === 401
          ? "Something went wrong"
          : "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    users: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "success";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
