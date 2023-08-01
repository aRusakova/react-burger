import { addOrder, clearOrder } from "./actions";
import { createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../../utils/types";

export type TOrderStore = {
  order?: IOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderStore = {
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      if (action.payload instanceof Error) {
        state.error = action.payload.message;
      }
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(clearOrder, (state) => {
      state.loading = false;
      state.error = null;
      state.order = null;
    });
  },
});

export const orderReducer = orderSlice.reducer;
