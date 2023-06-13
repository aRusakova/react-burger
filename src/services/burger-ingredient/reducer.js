import { createSlice } from "@reduxjs/toolkit";

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredient: null,
  },
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        state.ingredient = action.payload;
      },
    },
    deleteIngredient: {
      reducer: (state) => {
        state.ingredient = null;
      },
    },
  },
});

export const ingredientReducer = ingredientSlice.reducer;
export const { addIngredient, deleteIngredient } = ingredientSlice.actions;
