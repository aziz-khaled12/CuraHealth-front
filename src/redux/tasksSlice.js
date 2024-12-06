import { createSlice } from "@reduxjs/toolkit";

let nextId = 1;

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      console.log("add task: ", action.payload);
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter(task => task !== id);
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;