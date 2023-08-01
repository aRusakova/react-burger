import { configureStore as createStore, ThunkAction } from '@reduxjs/toolkit';
import { ingredientsReducer } from './burger-ingredients/reducer';
import { ingredientReducer, TIngredientActions } from './burger-ingredient/reducer';
import { constructReducer, TConstructActions } from './burger-constructor/reducer';
import { orderReducer } from './burger-order/reducer';
import { userReducer } from './user/reducer';
import { combineReducers } from "redux";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import type {} from "redux-thunk/extend-redux";
import { TOrderActions } from './burger-order/actions';
import { ordersFeedsReducer } from './burger-orders-feeds/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import { 
  connect as OrdersFeedsWsConnect, 
  disconnect as OrdersFeedsWsDisconnect,
  wsConnecting as OrdersFeedsWsConnecting,
  wsOpen as OrdersFeedsWsOpen,
  wsClose as OrdersFeedsWsClose,
  wsError as OrdersFeedseWsError,
  wsGetMessage as  OrdersFeedseGetMessage
} from "./burger-orders-feeds/actions";

import { 
  connect as OrdersProfileWsConnect, 
  disconnect as OrdersProfileWsDisconnect,
  wsConnecting as OrdersProfileWsConnecting,
  wsOpen as OrdersProfileWsOpen,
  wsClose as OrdersProfileWsClose,
  wsError as OrdersProfileWsError,
  wsGetMessage as  OrdersProfileeGetMessage
} from "./burger-orders-profile/actions";

import { TOrdersFeedsActions } from './burger-orders-feeds/actions';
import { TOrdersProfileActions } from './burger-orders-profile/actions';
import { orderDetailsReducer } from './burger-order-details/reducer';
import { ordersProfileReducer } from './burger-orders-profile/reducer';


const reducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  construct: constructReducer,
  user: userReducer,
  ordersFeeds: ordersFeedsReducer,
  ordersProfile: ordersProfileReducer,
  orderDetails: orderDetailsReducer,
});

const wsFeedActions = {
  wsConnect: OrdersFeedsWsConnect,
  wsDisconnect: OrdersFeedsWsDisconnect,
  wsConnecting: OrdersFeedsWsConnecting,
  onOpen: OrdersFeedsWsOpen,
  onClose: OrdersFeedsWsClose,
  onError: OrdersFeedseWsError,
  onMessage: OrdersFeedseGetMessage,
};

const wsProfileActions = {
  wsConnect: OrdersProfileWsConnect,
  wsDisconnect: OrdersProfileWsDisconnect,
  wsConnecting: OrdersProfileWsConnecting,
  onOpen: OrdersProfileWsOpen,
  onClose: OrdersProfileWsClose,
  onError: OrdersProfileWsError,
  onMessage: OrdersProfileeGetMessage,
};

const ordersMiddleware = socketMiddleware(wsFeedActions);
const ordersProfileMiddleware = socketMiddleware(wsProfileActions);

export const configureStore = () => {
  const store = createStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(ordersMiddleware, ordersProfileMiddleware)
    }
});

  return store;
};

export type RootState = ReturnType<typeof reducer>;

export type AppActions = TOrderActions | TIngredientActions | TConstructActions | TOrdersFeedsActions | TOrdersProfileActions;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;

type AppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk<TReturnType>
) => TReturnType;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
