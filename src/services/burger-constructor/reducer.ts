import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";
import { IIngredient, IIngredientWithKey } from "../../utils/types";

export type TConstructtStore = {
  consruct: {
    bun?: IIngredientWithKey | null;
    ingredients: Array<IIngredientWithKey>;
  };
};

export const initialState: TConstructtStore = {
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
      const { draggedElement, key } = action.payload;
      if (draggedElement.type === "bun") {
        state.consruct.bun = draggedElement;
      } else {
        state.consruct.ingredients = [
          ...state?.consruct?.ingredients,
          { ...draggedElement, key },
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
