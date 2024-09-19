import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const url = import.meta.env.VITE_BACK_END_URL;

const loadFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return {
    authStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!Cookies.get("token"),
    error: null,
  };
};

const initialState = loadFromLocalStorage();

// Async action for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("entered login");
    try {
      const res = await axios.post(`${url}/api/login`, { email, password });
      const { user } = res.data;
      console.log(user);

      return { user };
    } catch (err) {
      const errorMessage =
        err.response && err.response.status === 401
          ? "Invalid email or password, please try again"
          : "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async action for signup
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ Email, Password, Name, TypeID }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/api/register`, {
        Email,
        Password,
        Name,
        TypeID,
      });
      const { user } = res.data;
      return { user };
    } catch (err) {
      return rejectWithValue(err.res.data.error);
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    initialState,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authStatus = "pending";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authStatus = "success";
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.authStatus = "failed";
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.authStatus = "pending";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authStatus = "success";
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.authStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
