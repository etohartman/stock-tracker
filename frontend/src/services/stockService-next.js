import API from '../api';

export async function getAll() {
  const res = await API.get('/stocks');
  return res.data;
}

export async function deleteStock(id) {
  const res = await API.delete(`/stocks/${id}`);
  return res.data;
}

// Add more functions as needed (create, update, etc.)