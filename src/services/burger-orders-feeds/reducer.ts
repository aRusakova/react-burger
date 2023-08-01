import { IOrdersFeed, WebsocketStatus } from '../../utils/types';
import { createReducer } from '@reduxjs/toolkit'
import { wsOpen, wsClose, wsGetMessage, wsError, wsConnecting } from "./actions";
  
export interface IOrdersFeedStore {
    status: WebsocketStatus,
    connectionError: string,
    ordersFeed?: IOrdersFeed | null,
}

const initialState: IOrdersFeedStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    ordersFeed: null,
};

export const ordersFeedsReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(wsConnecting, (state) => {
          state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(wsOpen, (state) => {
          state.status = WebsocketStatus.ONLINE;
          state.connectionError = '';
      })
      .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsError, (state, action) => {
        state.connectionError = action.payload;
      })
      .addCase(wsGetMessage, (state, action) => {
        state.ordersFeed = action.payload;
      })
  })
