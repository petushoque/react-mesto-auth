export const BASE_URL = 'https://auth.nomoreparties.co/';

export function authorize () {
    console.log('hello')
}

export function checkToken (token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
}