// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import courseReducer from "../features/course/courseSlice";

// Combine all reducers into a single reducer
const appReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
});

// Global reducer to handle state reset on logout
const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    // Reset state to initial values on logout
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
