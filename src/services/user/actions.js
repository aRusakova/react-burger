import {
    login,
    logout,
    register,
    getUser,
    editUser
} from "../../utils/burger-api";
import {
    createAsyncThunk
} from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "user/login",
    async (payload, thunkAPI) => {
        try {
            const res = await login(payload);
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            return res.user;

        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "user/logout",
    async (thunkAPI) => {
        try {
            await logout();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/register",
    async (payload, thunkAPI) => {
        try {
            const res = await register(payload);
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            return res.user;

        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getUserWithToken = createAsyncThunk(
    "user/getUser",
    async (thunkAPI) => {
        try {
            const res = await getUser();
            return res.user;

        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getEditedUser = createAsyncThunk(
    "user/getEditedUser",
    async (payload, thunkAPI) => {
        try {
            const res = await editUser(payload);
            return res.user;

        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
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