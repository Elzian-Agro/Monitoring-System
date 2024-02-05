import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '../pages/auth/slice/emailSlice';
import dashboardLayoutReducer from '../pages/dashboard/slice/dashboardLayoutSlice';
import notificationReducer from 'pages/dashboard/slice/notificationSlice';
import UserReducer from 'pages/dashboard/slice/userSlice';
import errorReduer from 'error/slice/errorSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    dashboardLayout: dashboardLayoutReducer,
    notifications: notificationReducer,
    user: UserReducer,
    error: errorReduer
  },
});
