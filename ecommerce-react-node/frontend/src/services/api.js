import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001'
});

export function errorMessage(err) {
  const data = err.response?.data;
  if (data?.details?.length) return `${data.error}: ${data.details.join('; ')}`;
  return data?.error || err.message || 'Erro inesperado';
}

export const productService = {
  list: (params) => api.get('/products', { params }).then((r) => r.data),
  create: (body) => api.post('/products', body).then((r) => r.data),
  update: (id, body) => api.put(`/products/${id}`, body).then((r) => r.data),
  remove: (id) => api.delete(`/products/${id}`)
};

export const orderService = {
  create: (body) => api.post('/orders', body).then((r) => r.data)
};

export default api;
