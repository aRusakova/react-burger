import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/burger-api";

export const loadIngredients = createAsyncThunk(
  "ingredients/loadIngredients",
  async (thunkAPI) => {
    try {
      const res = await getIngredients();
      return res;
      
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
