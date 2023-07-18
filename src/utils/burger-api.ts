import { Exception } from "sass";
import { TIngredient, TOrder, TUser } from "./types";

const baseUrl = "https://norma.nomoreparties.space/api";

const POST = "POST";
const GET = "GET";
const PATCH = "PATCH";

type TIngredientsResponse = {
  success: boolean,
  data: TIngredient[],
}

type TUserResponse = {
  success: true,
  user: TUser,
}

type TUserLogout = {
  success: boolean,
  message: string,
} 

type TRefreahData = {
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

export const createReguestOptions = <T>(method:string, bodyItem:T, token?:boolean | string | null) => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? {authorization: localStorage.getItem('accessToken')} : {}),
    } as unknown as Headers,
    ...(bodyItem ? {body: JSON.stringify({...bodyItem})} : {}),
  };
}

export const getIngredients = async(): Promise<TIngredient[]> => {
  return await request<TIngredientsResponse>("/ingredients").then((response) => response.data);
};

export const addOrderToApi = (ingredients:TIngredient[]):Promise<TUser> => {
  const orderIngredients = {
    ingredients,
  }
  const requestOptions = createReguestOptions<{ingredients: TIngredient[]}>(POST, orderIngredients, true);
  return request<TUser>("/orders", requestOptions).then((response) => response);
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
      const refreshData: TRefreahData = await refreshToken<TRefreahData>(); //обновляем токен
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

export const register = async(user:TUser):Promise<TUserResponse> => {
  const requestOptions = createReguestOptions(POST, user);
  return await request<TUserResponse>("/auth/register", requestOptions).then((response) => response);
}

export const login = async (user:TUser): Promise<TUserResponse> => {
  const requestOptions = createReguestOptions(POST, user, true);
  return await fetchWithRefresh<TUserResponse>("/auth/login", requestOptions).then((response) => response);
}

export const logout = (): Promise<TUserLogout> => {
  const refreshToken = {token: localStorage.getItem("refreshToken")};
  const requestOptions = createReguestOptions(POST, refreshToken);
  return fetchWithRefresh<TUserLogout>("/auth/logout", requestOptions).then((response) => response);
}

//получение юзера по токену
export const getUser = ():Promise<TUserResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");
  const requestOptions = createReguestOptions(GET, null, refreshToken);
  return fetchWithRefresh<TUserResponse>("/auth/user", requestOptions).then((response) => response);
}

export const editUser = (user:TUser): Promise<TUserResponse> => {
  const requestOptions = createReguestOptions(PATCH, user, true);
  return fetchWithRefresh<TUserResponse>("/auth/user", requestOptions).then((response) => response);
}