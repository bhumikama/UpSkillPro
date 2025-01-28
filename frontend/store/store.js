import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import courseReducer from "../features/course/courseSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
  },
});
