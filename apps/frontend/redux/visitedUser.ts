import { createSlice } from "@reduxjs/toolkit";

export const visitedUserSlice = createSlice({
  name: "vu",
  initialState: {
    value: false,
  },
  reducers: {
    visit: (state) => {
      state.value = true;
    },
    unvisit: (state) => {
      state.value = false;
    },
  },
});

export const { visit, unvisit } = visitedUserSlice.actions;

export default visitedUserSlice.reducer;
