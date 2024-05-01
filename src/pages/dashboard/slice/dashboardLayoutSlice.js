import { createSlice } from '@reduxjs/toolkit';

const dashboardLayoutSlice = createSlice({
  name: 'dashboardLayout',
  initialState: {
    activeMenu: window.innerWidth < 640 ? 'close' : 'open',
    isProfileOpen: false,
    isNotificationOpen: false,
    notificationCount: 0,
    theme: '',
  },
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setProfileOpen: (state, action) => {
      state.isProfileOpen = action.payload;
    },
    setNotificationOpen: (state, action) => {
      state.isNotificationOpen = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setActiveMenu, setProfileOpen, setNotificationOpen, setNotificationCount, setTheme } =
  dashboardLayoutSlice.actions;

export const selectActiveMenu = (state) => state.dashboardLayout.activeMenu;
export const selectProfileOpen = (state) => state.dashboardLayout.isProfileOpen;
export const selectNotificationOpen = (state) => state.dashboardLayout.isNotificationOpen;
export const selectNotificationCount = (state) => state.dashboardLayout.notificationCount;
export const selectTheme = (state) => state.dashboardLayout.theme;

export default dashboardLayoutSlice.reducer;
