import { initialState, orderDetailsReducer } from "./reducer";
import { getOrder } from "./actions";

const orderDetails = {
  ingredients: [
    {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0941",
      name: "Биокотлета из марсианской Магнолии",
      type: "main",
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa093e",
      name: "Филе Люминесцентного тетраодонтимформа",
      type: "main",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0942",
      name: "Соус Spicy-X",
      type: "sauce",
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: "https://code.s3.yandex.net/react/code/sauce-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
    },
  ],
  _id: "1",
  status: "done",
  name: "Большая краторная булка",
  number: 123,
  createdAt: "01.01.2022",
  updatedAt: "01.01.2022",
};

describe("order details reducer", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle get order fulfilled", () => {
    const result = orderDetailsReducer(initialState, getOrder.fulfilled(orderDetails));
    expect(result).toEqual({
      ...initialState,
      orderDetails,
    });
  });

  it("should handle get order rejected", () => {
    const result = orderDetailsReducer(initialState, getOrder.rejected());
    expect(result).toEqual({
      ...initialState,
      error: true,
    });
  });

  it("should handle get order pending", () => {
    const result = orderDetailsReducer(initialState, getOrder.pending());
    expect(result).toEqual({
      ...initialState,
      loading: true,
    });
  });
});