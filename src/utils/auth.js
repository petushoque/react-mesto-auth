export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
}

export function register (email, password) {
  return fetch(`${BASE_URL}/signup`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(res => checkResponse(res))
}

export function authorize (email, password) {
  return fetch(`${BASE_URL}/signin`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(res => checkResponse(res))
}

export function checkToken (token) {
    return fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      method: 'GET',
    })
    .then(res => checkResponse(res))
}