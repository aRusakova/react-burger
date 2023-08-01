export interface IUser {
  email: string;
  name: string;
}

export interface IIngredient {
  _id: string;
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  type: string;
}

export interface IIngredientWithKey extends IIngredient {
  key: number;
}

interface IOrderItem {
  createdAt: string;
  ingredients: Array<IIngredient>;
  name: string;
  number: number;
  owner: object;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IOrder {
  name: string;
  order: IOrderItem;
  success: boolean;
}

export enum WebsocketStatus {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export interface IOrderInfo {
    ingredients: Array<string>;
    _id: string;
    status: string;
    name: string,
    number: number;
    createdAt: string;
    updatedAt: string;
}

export interface IOrdersFeed{
  success: boolean,
  orders: Array<IOrderInfo>
  total: number,
  totalToday: number,
}

