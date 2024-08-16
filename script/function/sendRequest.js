import { API } from "../config/API.js"
// асинхронна функція отримання користувача 

export async function sendRequestUsers(obj) {
  const response = await fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...obj })
  })
  if (!response.ok) {
    return false
  } else {
    const token = await response.text();
    return token;
  }
}
export async function createCard(token, obj) {
  const response = await fetch(`${API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ ...obj })
  })
  if (!response.ok) {

    return false
  } else {

    const result = await response.json();
    return result;
  }
}

export async function getCard(cardId, token) {
  const response = await fetch(`${API}/${cardId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  if (!response.ok) {

    return false
  } else {

    const result = await response.json();
    return result;
  }
}

export async function getAllCard(token) {
  const response = await fetch(`${API}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  if (!response.ok) {

    return false
  } else {

    const result = await response.json();
    // console.log(result);
    return result;
  }
}

export async function editCard(cardId, token, obj) {
  const response = await fetch(`${API}/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ ...obj })
  })
  if (!response.ok) {

    return false
  } else {

    const result = await response.json();
    return result;
  }
}

export async function deleteCard(cardId, token) {
  const response = await fetch(`${API}/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  return response.ok
}