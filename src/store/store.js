import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '../pages/auth/slice/emailSlice';
import dashboardLayoutReducer from '../pages/dashboard/slice/dashboardLayoutSlice';
import notificationReducer from 'pages/dashboard/slice/notificationSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    dashboardLayout: dashboardLayoutReducer,
    notifications: notificationReducer,
  },
});
