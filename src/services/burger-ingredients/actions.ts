import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/burger-api";

export const loadIngredients = createAsyncThunk(
  "ingredients/loadIngredients",
  async (payload, thunkAPI) => {
    try {
      const res = await getIngredients();
      return res;
      
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
