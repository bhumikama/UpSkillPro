import { createSlice } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { store } from "../../store/store";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      persistStore(store).purge();
    },
    updateUserInfo: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const { loginSuccess, logout, updateUserInfo } = authSlice.actions;

export default authSlice.reducer;
