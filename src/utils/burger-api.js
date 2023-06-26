const baseUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

function request(endpoint, options) {
  const url = baseUrl + endpoint;
  return fetch(url, options).then(checkResponse);
}

export const getIngredients = () => {
  return request("/ingredients").then((response) => response.data);
};

export const addOrderToApi = (ingredients) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  };
  return request("/orders", requestOptions).then((response) => response);
};

export const refreshToken = () => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }
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
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      name: user.name
    }),
  };
  return request("/auth/register", requestOptions).then((response) => response);
}


//нужен токен в хедере и обновление токена
export const login = (user) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  };
  return fetchWithRefresh("/auth/login", requestOptions).then((response) => response);
}

export const logout = () => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  return fetchWithRefresh("/auth/logout", requestOptions).then((response) => response);
}

//получение юзера по токену
export const getUser = () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('accessToken'),
    },
  };
  return fetchWithRefresh("/auth/user", requestOptions).then((response) => response);
}

export const editUser = (user) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      email: user.email,
      name: user.name,
      password: user.password,
    }),
  };
  return fetchWithRefresh("/auth/user", requestOptions).then((response) => response);
}