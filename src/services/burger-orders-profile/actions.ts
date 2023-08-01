import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<string, "ORDERS_PROFILE_CONNECT">("ORDERS_PROFILE_CONNECT");
export const disconnect = createAction("ORDERS_PROFILE_DISCONNECT");
export const wsConnecting = createAction("ORDERS_PROFILE_WS_CONNECTING");
export const wsOpen = createAction("ORDERS_PROFILE_WS_OPEN");
export const wsClose = createAction("ORDERS_PROFILE_WS_CLOSE");
export const wsGetMessage = createAction('ORDERS_PROFILE_WS_GET_MESSAGE');
export const wsError = createAction<string, "ORDERS_PROFILE_WS_ERROR">(
  "ORDERS_PROFILE_WS_ERROR"
);

export type TOrdersProfileActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsGetMessage>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsError>;