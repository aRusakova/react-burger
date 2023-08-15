import { initialState, orderReducer } from "./reducer";
import { addOrder, clearOrder } from "./actions";

const order = {
  name: "Большая краторная булка",
  order: {
    number: 123,
  },
  success: true,
};

describe("order reducer", () => {
  it("should return the initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle add order fulfilled", () => {
    const result = orderReducer(initialState, addOrder.fulfilled(order));
    expect(result).toEqual({
      ...initialState,
      order,
    });
  });

  it("should handle add order rejected", () => {
    const result = orderReducer(initialState, addOrder.rejected());
    expect(result).toEqual({
      ...initialState,
      error: true,
    });
  });

  it("should handle add order pending", () => {
    const result = orderReducer(initialState, addOrder.pending());
    expect(result).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle clear order", () => {
    const result = orderReducer(initialState, clearOrder());
    expect(result).toEqual(initialState);
  });
});
