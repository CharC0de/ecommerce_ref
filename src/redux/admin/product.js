import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  write: {
    isChanged: true,
    writePayload: [],
    writeType: null,
  },
  products: null,
};
const productSlice = createSlice({
  name: "productAdmin",
  initialState: initialState,
  reducers: {
    read: (state, action) => {
      state.write.isChanged = false;
      state.write.writePayload = [];
      state.products = action.payload;
      state.writeType = null;
    },
    write: (state, action) => {
      state.write.isChanged = true;
      state.write.writeType = action.payload;
    },
    addWrite: (state, action) => {
      state.write.writePayload = [...state.write.writePayload, action.payload];
    },
    removeWrite: (state, action) => {
      state.write.writePayload.splice(
        state.write.writePayload.indexOf(action.payload),
        1
      );
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const reducer = productSlice.reducer;
export const actions = productSlice.actions;
