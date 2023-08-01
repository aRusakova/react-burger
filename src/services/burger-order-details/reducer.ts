import { getOrder } from "./actions";
import { createSlice } from "@reduxjs/toolkit";
import { IOrderInfo } from "../../utils/types";

export type TOrderDetailsStore = {
  loading: boolean,
  orderDetails?: IOrderInfo | null,
  error: string | null,
};


const initialState: TOrderDetailsStore = {
  loading: false,
  orderDetails: null,
  error: null,
};

const orderDetailsSlice = createSlice({
  name: "order-details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.orderDetails = null;
      if (action.payload instanceof Error) {
        state.error = action.payload.message;
      }
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orderDetails = action.payload;
    });
  },
});

export const orderDetailsReducer = orderDetailsSlice.reducer;
