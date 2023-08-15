import { IUser } from "../../utils/types";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserWithToken,
  getEditedUser,
  checkUserAuth,
} from "./actions";
import { createSlice } from "@reduxjs/toolkit";

export type TUsertStore = {
  user?: IUser | null;
  loading: boolean;
  error: boolean;
  isAuthChecked: boolean;
};

export const initialState: TUsertStore = {
  user: null,
  loading: false,
  error: false,
  isAuthChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isAuthChecked = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })

      .addCase(getUserWithToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserWithToken.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUserWithToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      .addCase(getEditedUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEditedUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getEditedUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      });
  },
});

export const userReducer = userSlice.reducer;
