import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const constructSlice = createSlice({
  name: "consruct",
  initialState: {
    consruct: {
      bun: null,
      ingredients: [],
    },
  },
  reducers: {
    addConstructIngredient: {
      //   reducer: (state, action) => {
      //     console.log(action);
      //     state.ingredient = action.payload;
      //   },
      reducer: (state, action) => {
        if (action.payload.type === "bun") {
          state.consruct.bun = action.payload;
        } else {
          state.consruct.ingredients = [
            ...state.consruct.ingredients,
            { ...action.payload, key: uuidv4() },
          ];
        }
      },
    },
    deleteConstructIngredient: {
      //   reducer: (state) => {
      //     state.ingredient = null;
      //   },
      reducer: (state, action) => {
        state.consruct.ingredients = state.consruct.ingredients.filter(
          (ingredient) => ingredient.key !== action.payload
        );
      },
    },
    deleteAllConstructIngredients: {
      //   reducer: (state) => {
      //     state.ingredient = null;
      //   },
      reducer: (state) => {
        state.consruct.ingredients = [];
        state.consruct.bun = null;
      },
    },
  },
});

export const constructReducer = constructSlice.reducer;
export const { deleteAllConstructIngredients, addConstructIngredient, deleteConstructIngredient } =
  constructSlice.actions;
