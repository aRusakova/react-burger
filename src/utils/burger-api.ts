import { Exception } from "sass";
import { IIngredient, IUser } from "./types";

const baseUrl = "https://norma.nomoreparties.space/api";

const POST = "POST";
const GET = "GET";
const PATCH = "PATCH";

interface IIngredientsResponse {
  success: boolean,
  data: IIngredient[],
}

type IUserResponse = {
  success: true,
  user: IUser,
}

type IUserLogout = {
  success: boolean,
  message: string,
} 

type IRefreahData = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
}

const checkResponse = <T>(res:Response):Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const request = async<T>(endpoint:string, options?:RequestInit): Promise<T> => {
  const url = baseUrl + endpoint;
  return await fetch(url, options).then(checkResponse<T>);
}

export const createReguestOptions = <T>(method:string, bodyItem:T, token?:boolean | null) => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? {authorization: localStorage.getItem('accessToken')} : {}),
    } as unknown as Headers,
    ...(bodyItem ? {body: JSON.stringify({...bodyItem})} : {}),
  };
}

export const getIngredients = async(): Promise<IIngredient[]> => {
  return await request<IIngredientsResponse>("/ingredients").then((response) => response.data);
};

export const addOrderToApi = (ingredients:IIngredient[]):Promise<IUser> => {
  const orderIngredients = {
    ingredients,
  }
  const requestOptions = createReguestOptions<{ingredients: IIngredient[]}>(POST, orderIngredients, true);
  return request<IUser>("/orders", requestOptions).then((response) => response);
};

export const refreshToken = <T>():Promise<T> => {
  const refreshToken = {token: localStorage.getItem("refreshToken")};
  const requestOptions = createReguestOptions(POST, refreshToken);
  return request<T>("/auth/token", requestOptions);
};

export const fetchWithRefresh = async <T>(url:string, options:RequestInit): Promise<T> => {
  try {
    return request<T>(url, options);
  } catch (err) {
    if ((err as Exception).message === "jwt expired") {
      const refreshData: IRefreahData = await refreshToken<IRefreahData>(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      (options.headers as any).authorization = refreshData.accessToken;
      return request(url, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export const register = async(user:IUser):Promise<IUserResponse> => {
  const requestOptions = createReguestOptions(POST, user);
  return await request<IUserResponse>("/auth/register", requestOptions).then((response) => response);
}

export const login = async (user:IUser): Promise<IUserResponse> => {
  const requestOptions = createReguestOptions(POST, user, true);
  return await fetchWithRefresh<IUserResponse>("/auth/login", requestOptions).then((response) => response);
}

export const logout = (): Promise<IUserLogout> => {
  const refreshToken = {token: localStorage.getItem("refreshToken")};
  const requestOptions = createReguestOptions(POST, refreshToken);
  return fetchWithRefresh<IUserLogout>("/auth/logout", requestOptions).then((response) => response);
}

//получение юзера по токену
export const getUser = async():Promise<IUserResponse> => {
  const requestOptions = createReguestOptions(GET, null, true);
  return fetchWithRefresh<IUserResponse>("/auth/user", requestOptions).then((response) => response);
}

export const editUser = (user:IUser): Promise<IUserResponse> => {
  const requestOptions = createReguestOptions(PATCH, user, true);
  return fetchWithRefresh<IUserResponse>("/auth/user", requestOptions).then((response) => response);
}