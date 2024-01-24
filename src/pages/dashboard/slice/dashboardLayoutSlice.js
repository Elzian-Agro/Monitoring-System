import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMenu: 'open',
  isProfileOpen: false,
  isNotificationOpen: false,
  theme: '',
  areNotificationsUnread: true,
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
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setAreNotificationsUnread: (state, action) => {
      state.areNotificationsUnread = action.payload;
    },
  },
});

export const { setActiveMenu, setProfileOpen, setNotificationOpen, setTheme, setAreNotificationsUnread, } = dashboardLayoutSlice.actions;

export const selectActiveMenu = (state) => state.dashboardLayout.activeMenu;
export const selectProfileOpen = (state) => state.dashboardLayout.isProfileOpen;
export const selectNotificationOpen = (state) => state.dashboardLayout.isNotificationOpen;
export const selectTheme = (state) => state.dashboardLayout.theme;
export const selectAreNotificationsUnread = (state) => state.dashboardLayout.areNotificationsUnread;

export default dashboardLayoutSlice.reducer;
