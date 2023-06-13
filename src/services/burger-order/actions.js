import { addOrderToApi } from "../../utils/burger-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (payload, thunkAPI) => {
    try {
      return await addOrderToApi(payload);
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
