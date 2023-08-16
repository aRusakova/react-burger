import { createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/types";

export type TIngredientStore = {
  ingredient?: IIngredient | null;
};

export const initialState: TIngredientStore = {
  ingredient: null,
};

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
    deleteIngredient: (state) => {
      state.ingredient = null;
    },
  },
});

export const ingredientReducer = ingredientSlice.reducer;
export const { addIngredient, deleteIngredient } = ingredientSlice.actions;

export type TIngredientActions =
  | ReturnType<typeof addIngredient>
  | ReturnType<typeof deleteIngredient>;
