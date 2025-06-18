import sendRequest from "./sendRequest";

const BASE_URL = '/api/auth'; 

export async function signUp(userData) {
  const token = await sendRequest(BASE_URL + '/signup', 'POST', userData);
  console.log('Returned token from signup:', token.token); // <— add this
  localStorage.setItem('token', token.token);
  return getUser();
}
export async function logIn(credentials) {
  const token = await sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  console.log('Returned token from login:', token.token); // <— add this
  localStorage.setItem('token', token.token);
  return getUser();
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }
    return token;
  } catch (err) {
    console.error('Invalid token in localStorage:', err);
    localStorage.removeItem('token');
    return null;
  }
}

export function logOut() {
  localStorage.removeItem('token');
}