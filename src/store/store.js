import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../pages/auth/slice/emailSlice";

export const store = configureStore({
  reducer: {
    email: emailReducer,
  },
});
