import { IOrdersFeed, WebsocketStatus } from '../../utils/types';
import { createReducer } from '@reduxjs/toolkit'
import { wsOpen, wsClose, wsGetMessage, wsError, wsConnecting } from "./actions";
  
export interface IOrdersProfileStore {
    status: WebsocketStatus,
    connectionError: string,
    ordersProfile?: IOrdersFeed | null,
}

export const initialState: IOrdersProfileStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    ordersProfile: null,
};

export const ordersProfileReducer = createReducer(initialState, (builder) => {
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
        state.ordersProfile = action.payload;
      })
  })
