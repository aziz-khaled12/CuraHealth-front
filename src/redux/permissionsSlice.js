import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let nextId = 1;
const token = localStorage.getItem("token");
const url = import.meta.env.VITE_BACK_END_URL;

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/All/permission`);
      const permissions = res.data.permitions.map((permission) => {
        return {
          id: permission.PermitionID,
          name: permission.NamePermition,
        }
      });
      console.log(permissions)
      return permissions;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);



export const attachPermission = createAsyncThunk(
  "permissions/attachPermission",
  async (attachData, { rejectWithValue }) => {
    console.log(attachData)
    try {
      const res = await axios.post(`${url}/api/permition`, attachData, {
        headers: { Authorization: `${token}` },
      });      
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
   
    console.log("Permission attached successfully");
  }
);

export const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    permissions: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addPermission: (state, action) => {
      const newPermission = {
        id: nextId++,
        ...action.payload,
      };
      state.permissions.push(newPermission);
    },
    updatePermission: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingPermission = state.permissions.find(
        (permission) => permission.id === id
      );
      if (existingPermission) {
        Object.assign(existingPermission, changes);
      }
    },
    deletePermission: (state, action) => {
      const id = action.payload;
      state.permissions = state.permissions.filter((permission) => permission.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addPermission, updatePermission, deletePermission } =
  permissionsSlice.actions;

export default permissionsSlice.reducer;
