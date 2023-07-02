import { configureStore as createStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './burger-ingredients/reducer';
import { ingredientReducer } from './burger-ingredient/reducer';
import { constructReducer } from './burger-constructor/reducer';
import { orderReducer } from './burger-order/reducer';
import { userReducer } from './user/reducer';

export const configureStore = () => {
  const store = createStore({
    reducer: {
      ingredients: ingredientsReducer,
      ingredient: ingredientReducer,
      order: orderReducer ,
      construct: constructReducer,
      user: userReducer,
    },
});

  return store;
};