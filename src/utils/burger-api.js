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
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  };
  return request("/orders", requestOptions).then((response) => response);
};
