import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const emailSlice = createSlice({
  name: "hashedEmail",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateEmail } = emailSlice.actions;

export default emailSlice.reducer;
