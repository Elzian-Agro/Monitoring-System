import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '../pages/auth/slice/emailSlice';
import dashboardLayoutReducer  from '../pages/dashboard/slice/dashboardLayoutSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    dashboardLayout: dashboardLayoutReducer,
  },
});
