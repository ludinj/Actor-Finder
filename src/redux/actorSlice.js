import { createSlice } from "@reduxjs/toolkit";

export const actorSlice = createSlice({
  name: "actor",
  initialState: {
    actorInfo: null,
    pending: null,
    error: false,
  },

  reducers: {
    fetchStart: (state) => {
      state.pending = true;
    },
    fetchSuccess: (state, action) => {
      state.pending = false;
      state.actorInfo = action.payload;
      state.error = false;
    },
    fetchError: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } = actorSlice.actions;
export default actorSlice.reducer;
