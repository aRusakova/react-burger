import { IIngredient } from "../../utils/types";
import { loadIngredients } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

export type TIngredientsStore = {
  ingredients?: Array<IIngredient> | null,
  loading: boolean,
  error: string | unknown | null,
};

const initialState: TIngredientsStore = {
  ingredients: [],
  loading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;