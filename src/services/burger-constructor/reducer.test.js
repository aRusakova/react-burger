import {
  initialState,
  constructReducer,
  addConstructIngredient,
  deleteConstructIngredient,
  deleteAllConstructIngredients,
  moveConstructIngredients,
} from "./reducer";

const bun = {
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
};

const ingredient = {
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
  key: "123",
};

const ingredientTwo = {
  _id: "643d69a5c3f7b9001cfa0947",
  name: "Плоды Фалленианского дерева",
  type: "main",
  proteins: 20,
  fat: 5,
  carbohydrates: 55,
  calories: 77,
  price: 874,
  image: "https://code.s3.yandex.net/react/code/sp_1.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
  __v: 0,
  key: "321",
};

describe("burger constructor reducer", () => {
  it("should return the initial state", () => {
    expect(constructReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle add bun in constructor", () => {
    const result = constructReducer(initialState, addConstructIngredient({draggedElement: bun}));
    expect(result).toEqual({
      consruct: {
        ...initialState.consruct,
        bun: bun,
      },
    });
  });

    it("should handle add  ingredient in constructor", () => {
      const result = constructReducer(initialState, addConstructIngredient({ draggedElement: ingredient, key: '123' }));
      expect(result).toEqual({
        consruct: {
          ...initialState.consruct,
          ingredients: [...initialState.consruct.ingredients, {...ingredient, key: '123'}]
        },
      });
    });

  it("should handle delete ingredient from constructor", () => {
    const state = {
      consruct: {
        ...initialState.consruct,
        ingredients: [...initialState.consruct.ingredients, { ...ingredient }],
      },
    };
    const deleteIngredientKey = "123";
    const result = constructReducer(
      state,
      deleteConstructIngredient(deleteIngredientKey)
    );
    expect(result).toEqual(initialState);
  });

  it("should handle delete all ingredients from constructor", () => {
    const result = constructReducer(
      initialState,
      deleteAllConstructIngredients()
    );
    expect(result).toEqual(initialState);
  });

  it("should handle swap two ingredients", () => {
    const state = {
        consruct: {
          ...initialState.consruct,
          ingredients: [ingredient, ingredientTwo],
        },
      };

      const stateAfterSwap = {
        consruct: {
          ...initialState.consruct,
          ingredients: [ingredientTwo, ingredient],
        },
      };
      const result = constructReducer(
        state,
        moveConstructIngredients({draggableIndex: 0, index: 1})
      );
      expect(result).toEqual(stateAfterSwap);
  });
});
