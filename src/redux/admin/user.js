import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  write: {
    isChanged: true,
    id: null,
  },
  users: null,
};

const userSlice = createSlice({
  name: "userAdmin",
  initialState: initialState,
  reducers: {
    read: (state, action) => {
      state.users = action.payload;
      state.write.isChanged = false;
      state.write.id = null;
    },
    write: (state, action) => {
      state.write.isChanged = true;
      state.write.id = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const actions = userSlice.actions;
export const reducer = userSlice.reducer;
