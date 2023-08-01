import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IIngredient, IIngredientWithKey } from "../../utils/types";

export type TConstructtStore = {
  consruct: {
    bun?: IIngredient | null;
    ingredients: Array<IIngredientWithKey>;
  };
};

const initialState: TConstructtStore = {
  consruct: {
    bun: null,
    ingredients: [],
  },
};

export const constructSlice = createSlice({
  name: "consruct",
  initialState,
  reducers: {
    addConstructIngredient: (state, action) => {
      if (action.payload.type === "bun") {
        state.consruct.bun = action.payload;
      } else {
        state.consruct.ingredients = [
          ...state?.consruct?.ingredients,
          { ...action.payload, key: uuidv4() },
        ];
      }
    },

    deleteConstructIngredient: (state, action) => {
      state.consruct.ingredients = state?.consruct?.ingredients?.filter(
        (ingredient) => ingredient.key !== action.payload
      );
    },

    deleteAllConstructIngredients: (state) => {
      state.consruct.ingredients = [];
      state.consruct.bun = null;
    },

    moveConstructIngredients: (state, action) => {
      const { draggableIndex, index } = action.payload;
      const newIngredients = state.consruct.ingredients;
      [newIngredients[draggableIndex], newIngredients[index]] = [
        newIngredients[index],
        newIngredients[draggableIndex],
      ];
      state.consruct.ingredients = newIngredients;
    },
  },
});

export const constructReducer = constructSlice.reducer;
export const {
  deleteAllConstructIngredients,
  addConstructIngredient,
  deleteConstructIngredient,
  moveConstructIngredients,
} = constructSlice.actions;

export type TConstructActions =
  | ReturnType<typeof deleteAllConstructIngredients>
  | ReturnType<typeof addConstructIngredient>
  | ReturnType<typeof deleteConstructIngredient>
  | ReturnType<typeof moveConstructIngredients>;
