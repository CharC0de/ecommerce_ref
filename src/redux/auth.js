import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  error: null,
  userData: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    success: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.error = null;
    },
    error: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
      state.userData = null;
    },
    failed: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      state.userData = null;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});
export const actions = authSlice.actions;
export const reducer = authSlice.reducer;
