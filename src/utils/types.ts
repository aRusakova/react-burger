export interface IUser {
    email: string,
    name: string,
}

export interface IIngredient  {
    _id: string,
    name: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    type: string,
}

export interface IOrder  {
    name: string
    number: number,
    success: boolean,
}