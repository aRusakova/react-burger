const url = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = () => {
  return fetch(`${url}/ingredients`)
    .then(checkResponse)
    .then((response) => response.data);
};

export const addOrderToApi = (ingredients) => {
  return fetch(`${url}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  })
    .then(checkResponse)
    .then((response) => response);
};
