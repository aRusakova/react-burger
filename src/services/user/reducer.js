import { loginUser, logoutUser, registerUser, getUserWithToken, getEditedUser, checkUserAuth } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "user",
    initialState: {
      user: null,
      loading: false,
      error: null,
      isAuthChecked: false,
    },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;

      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
      })

      .addCase(getUserWithToken.pending, (state) => {
        state.loading = true;

      })
      .addCase(getUserWithToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserWithToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      .addCase(getEditedUser.pending, (state) => {
        state.loading = true;

      })
      .addCase(getEditedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEditedUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;

      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
      })
  },
});

export const userReducer = orderSlice.reducer;