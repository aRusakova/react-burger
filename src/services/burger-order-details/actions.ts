import { getOrderFromApi } from "../../utils/burger-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOrder = createAsyncThunk(
  "order-details/getOrder",
  async (payload: string, thunkAPI) => {
    try {
      const res = await getOrderFromApi(payload);
      return res.orders[0];
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

