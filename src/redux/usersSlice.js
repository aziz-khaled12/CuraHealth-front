import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACK_END_URL;

const prepareUserData = (user) => {
  return {
    id: user.UserID,
    userName: user.Name,
    email: user.Email,
    type:  user.TypeName,
    TypeID:  user.TypeID,
  };
};
// Async action for fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/All/user`);
      console.log("res: ", res.data);
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

export const register = createAsyncThunk(
  "users/register",
  async ({ Email, Password, Name, TypeID }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/api/register`, {
        Email,
        Password,
        Name,
        TypeID,
      });

      const user = prepareUserData(res.data);
      console.log('user:', user)
      return user;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersStatus: "idle", // 'idle' | 'loading' | 'success' | 'failed'
    users: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersStatus = "pending";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.usersStatus = "success";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersStatus = "failed";
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.usersStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.usersStatus = "success";
      })
      .addCase(register.rejected, (state, action) => {
        state.usersStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
