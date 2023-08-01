import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { RootState } from "../store";

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>,
};

export const socketMiddleware = (
  wsActions: TwsActionTypes
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsDisconnect,
        onOpen,
        onClose,
        onError,
        wsConnecting,
        onMessage,
      } = wsActions;
      
      if (wsConnect.match(action)) {
        url = action.payload;
        const accessToken = localStorage.getItem("accessToken")?.slice(7);
        socket = new WebSocket(
          `${url}${accessToken ? `?token=${accessToken}` : ''}`
        );
        isConnected = true;
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (err) => {
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(onError(event.code.toString()));
          }
          dispatch(onClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
        };

        if (wsDisconnect.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(onClose());
        }
      }

      next(action);
    };
  };
};
