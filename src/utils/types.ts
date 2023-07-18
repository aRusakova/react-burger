export type TUser = {
    email: string,
    name: string,
}

export type TIngredient = {
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

type TOrderNum = {
    number: number,
}

export type TOrder = {
    name: string
    number: TOrderNum,
    success: boolean,
}