import { initialState, ordersProfileReducer } from "./reducer";
import {
  wsOpen,
  wsClose,
  wsGetMessage,
  wsError,
  wsConnecting,
} from "./actions";

const ordersProfile = {
  status: "ONLINE",
  connectionError: "",
  ordersFeed: {
    success: true,
    orders: [
      {
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-02-large.png",
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/meat-01-large.png",
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/meat-03-large.png",
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/sauce-02-large.png",
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            __v: 0,
          },
        ],
        _id: "1",
        status: "done",
        name: "Большая краторная булка",
        number: 123,
        createdAt: "01.01.2022",
        updatedAt: "01.01.2022",
      },
      {
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-02-large.png",
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/meat-01-large.png",
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/meat-03-large.png",
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/sauce-02-large.png",
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            __v: 0,
          },
        ],
        _id: "1",
        status: "done",
        name: "Большая краторная булка",
        number: 123,
        createdAt: "01.01.2022",
        updatedAt: "01.01.2022",
      },
    ],
    total: 2,
    totalToday: 2,
  },
};

describe("orders feed reducer", () => {
  it("should return the initial state", () => {
    expect(ordersProfileReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle web socket open", () => {
    const result = ordersProfileReducer(initialState, wsOpen());
    expect(result).toEqual({
      ...initialState,
      status: "ONLINE",
    });
  });

  it("should handle web socket close", () => {
    const result = ordersProfileReducer(initialState, wsClose());
    expect(result).toEqual({
      ...initialState,
      status: "OFFLINE",
    });
  });

  it("should handle web socket error", () => {
    const result = ordersProfileReducer(initialState, wsError("error"));
    expect(result).toEqual({
      ...initialState,
      connectionError: "error",
    });
  });

  it("should handle web socket connecting", () => {
    const result = ordersProfileReducer(initialState, wsConnecting());
    expect(result).toEqual({
      ...initialState,
      status: "CONNECTING",
    });
  });

  it("should handle web socket get message", () => {
    const result = ordersProfileReducer(initialState, wsGetMessage(ordersProfile));
    expect(result).toEqual({
      ...initialState,
      ordersProfile,
    });
  });
});
