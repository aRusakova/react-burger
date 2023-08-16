import {
    addIngredient,
    deleteIngredient,
    ingredientReducer,
    initialState
} from "./reducer";

const ingredient = {
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

describe("ingredient reducer", () => {

    it("should return the initial state", () => {
        expect(ingredientReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle add ingredient", () => {
        const result = ingredientReducer(initialState, addIngredient(ingredient));
        expect(result).toEqual({
            ...initialState,
            ingredient: ingredient,
        });
    });

    it("should handle delete ingredient", () => {
        const result = ingredientReducer(initialState, deleteIngredient());
        expect(result).toEqual(initialState);
    });
});