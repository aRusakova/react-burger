import { addOrder, clearOrder } from "./actions";
import { createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../../utils/types";

export type TOrderStore = {
  order?: IOrder | null;
  loading: boolean;
  error: boolean;
};

export const initialState: TOrderStore = {
  order: null,
  loading: false,
  error: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrder.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addOrder.rejected, (state) => {
      state.loading = false;
      state.order = null;
      state.error = true;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(clearOrder, (state) => {
      state.loading = false;
      state.error = false;
      state.order = null;
    });
  },
});

export const orderReducer = orderSlice.reducer;
