import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMenu: 'open',
};

const dashboardLayoutSlice = createSlice({
  name: 'dashboardLayout',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setActiveMenu } = dashboardLayoutSlice.actions;
export const selectActiveMenu = (state) => state.dashboardLayout.activeMenu;

export default dashboardLayoutSlice.reducer;
