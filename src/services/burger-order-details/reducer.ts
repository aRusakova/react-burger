import { getOrder } from "./actions";
import { createSlice } from "@reduxjs/toolkit";
import { IOrderInfo } from "../../utils/types";

export type TOrderDetailsStore = {
  loading: boolean,
  orderDetails?: IOrderInfo | null,
  error: boolean,
};


export const initialState: TOrderDetailsStore = {
  loading: false,
  orderDetails: null,
  error: false,
};

const orderDetailsSlice = createSlice({
  name: "order-details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.orderDetails = null;
      state.error = true;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orderDetails = action.payload;
    });
  },
});

export const orderDetailsReducer = orderDetailsSlice.reducer;
