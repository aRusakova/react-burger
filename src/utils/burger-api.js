const baseUrl = "https://norma.nomoreparties.space/api";

const POST = "POST";
const GET = "GET";
const PATCH = "PATCH";


const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const request = (endpoint, options) => {
  const url = baseUrl + endpoint;
  return fetch(url, options).then(checkResponse);
}

export const createReguestOptions = (method, bodyItem, token) => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? {authorization: localStorage.getItem('accessToken')} : {}),
    },
    ...(bodyItem ? {body: JSON.stringify({...bodyItem})} : {}),
  };
}

export const getIngredients = () => {
  return request("/ingredients").then((response) => response.data);
};

export const addOrderToApi = (ingredients) => {
  const orderIngredients = {
    ingredients,
  }
  const requestOptions = createReguestOptions(POST, orderIngredients, true);
  return request("/orders", requestOptions).then((response) => response);
};

export const refreshToken = () => {
  const refreshToken = {token: localStorage.getItem("refreshToken")};
  const requestOptions = createReguestOptions(POST, refreshToken);
  return request("/auth/token", requestOptions);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    return request(url, options);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      return request(url, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export const register = (user) => {
  const requestOptions = createReguestOptions(POST, user);
  return request("/auth/register", requestOptions).then((response) => response);
}

export const login = (user) => {
  const requestOptions = createReguestOptions(POST, user, true);
  return fetchWithRefresh("/auth/login", requestOptions).then((response) => response);
}

export const logout = () => {
  const refreshToken = {token: localStorage.getItem("refreshToken")};
  const requestOptions = createReguestOptions(POST, refreshToken);
  return fetchWithRefresh("/auth/logout", requestOptions).then((response) => response);
}

//получение юзера по токену
export const getUser = () => {
  const requestOptions = createReguestOptions(GET, null, refreshToken);
  return fetchWithRefresh("/auth/user", requestOptions).then((response) => response);
}

export const editUser = (user) => {
  const requestOptions = createReguestOptions(PATCH, user, true);
  return fetchWithRefresh("/auth/user", requestOptions).then((response) => response);
}