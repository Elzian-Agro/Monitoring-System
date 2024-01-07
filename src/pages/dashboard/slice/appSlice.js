import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMenu: 'open',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setActiveMenu } = appSlice.actions;
export const selectActiveMenu = (state) => state.app.activeMenu;

export default appSlice.reducer;
