import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allNotifications: [],
  notificationsCount: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setAllNotifications: (state, action) => {
      state.allNotifications = action.payload;
    },
    setNotificationsCount: (state, action) => {
      state.notificationsCount = action.payload;
    },
  },
});

export const { setAllNotifications, setNotificationsCount } = notificationsSlice.actions;
export const selectAllNotifications = (state) => state.notifications.allNotifications;
export const selectNotificationsCount = (state) => state.notifications.notificationsCount;

export default notificationsSlice.reducer;
