import {
  login,
  logout,
  register,
  getUser,
  editUser,
} from "../../utils/burger-api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../utils/types";
import { IUseFormProps } from "../../hooks/useForm";

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload: IUseFormProps, thunkAPI) => {
    try {
      const res = await login(payload);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      return res.user;
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (payload, thunkAPI) => {
    try {
      await logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (payload: IUseFormProps, thunkAPI) => {
    try {
      const res = await register(payload);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      return res.user;
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getUserWithToken = createAsyncThunk(
  "user/getUser",
  async (payload, thunkAPI) => {
    try {
      const res = await getUser();
      return res.user;
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getEditedUser = createAsyncThunk(
  "user/getEditedUser",
  async (payload: IUser, thunkAPI) => {
    try {
      const res = await editUser(payload);
      return res.user;
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  "user/checkUserAuth",
  async (unknown, thunkAPI) => {
    if (localStorage.getItem("accessToken")) {
      try {
        await thunkAPI.dispatch(getUserWithToken());
      } catch (e) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        thunkAPI.rejectWithValue("");
      }
    }
  }
);
