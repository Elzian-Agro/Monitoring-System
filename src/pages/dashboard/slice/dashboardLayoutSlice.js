import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMenu: 'open',
  isProfileOpen: false,
  isNotificationOpen: false,
};

const dashboardLayoutSlice = createSlice({
  name: 'dashboardLayout',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setProfileOpen: (state, action) => {
      state.isProfileOpen = action.payload;
    },
    setNotificationOpen: (state, action) => {
      state.isNotificationOpen = action.payload;
    }
  },
});

export const { setActiveMenu, setProfileOpen, setNotificationOpen } = dashboardLayoutSlice.actions;

export const selectActiveMenu = (state) => state.dashboardLayout.activeMenu;
export const selectProfileOpen = (state) => state.dashboardLayout.isProfileOpen;
export const selectNotificationOpen = (state) => state.dashboardLayout.isNotificationOpen;

export default dashboardLayoutSlice.reducer;
