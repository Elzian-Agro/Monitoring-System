import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../pages/auth/slice/emailSlice";
import appReducer from "../pages/dashboard/slice/appSlice"

export const store = configureStore({
  reducer: {
    email: emailReducer,
    app: appReducer,
  },
});
