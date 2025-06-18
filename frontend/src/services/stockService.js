import sendRequest from "./sendRequest";

const BASE_URL = '/api/stocks';

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function create(stockData) {
  return sendRequest(BASE_URL, 'POST', stockData);
}
export async function update(stockId, stockData) {
  return sendRequest(`${BASE_URL}/${stockId}`, 'PUT', stockData);
}
export async function getById(stockId) {
  return sendRequest(`${BASE_URL}/${stockId}`);
}
export async function deleteStock(stockId) {
  return sendRequest(`${BASE_URL}/${stockId}`, 'DELETE');
}
