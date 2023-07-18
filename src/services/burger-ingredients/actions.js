import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/burger-api";

export const loadIngredients = createAsyncThunk(
  "ingredients/loadIngredients",
  async (thunkAPI) => {
    try {
      console.log('ffff')
      const res = await getIngredients();
      console.log(res);
      return res;
      
    } catch (error) {
      console.log('err')
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
