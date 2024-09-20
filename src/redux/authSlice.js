// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const url = import.meta.env.VITE_BACK_END_URL;

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/api/login`, { email, password });
      console.log(res);
      const token = res.data.token;
      const decodedToken = jwtDecode(token);
      console.log("decoded: ", decodedToken);
      const user = decodedToken.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { user, token };
    } catch (err) {
      return rejectWithValue(
        err.response && err.response.status === 401
          ? "Invalid email or password, please try again"
          : "Something went wrong"
      );
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, username, role }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/api/signup`, {
        email,
        password,
        username,
        role,
      });
      const token = res.data;
      const decodedToken = jwtDecode(token);
      const user = decodedToken.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { user, token };
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (auth.accessToken) {
      try {
        const res = await axios.post(
          `${url}/auth/verify-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        if (res.status !== 200) {
          throw new Error("Token verification failed");
        }
      } catch (err) {
        return rejectWithValue("Token verification failed");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(
      (
        // just make an arrow function and call it 
        () => {
        const Parce = localStorage.getItem("user");
        if (Parce === undefined) {
          return Parce;
        } else {
          return null;
        }
      })() // <== the call 
    ),
    //user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    error: null,
    authStatus: "idle",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authStatus = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.authStatus = "failed";
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.authStatus = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authStatus = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.authStatus = "failed";
        state.error = action.payload;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.error = "Token verification failed";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
