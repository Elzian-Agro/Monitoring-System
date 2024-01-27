import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allNotifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setAllNotifications: (state, action) => {
      state.allNotifications = action.payload;
    },
  },
});

export const { setAllNotifications } = notificationsSlice.actions;
export const selectAllNotifications = (state) => state.notifications.allNotifications;

export default notificationsSlice.reducer;
