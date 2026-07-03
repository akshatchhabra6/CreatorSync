import api from './api';

export const getMyBrand = () => api.get('/brand').then((res) => res.data);
export const getBrandById = (id) => api.get('/brand', { params: { id } }).then((res) => res.data);
export const createBrand = (data) => api.post('/brand', data).then((res) => res.data);
export const updateBrand = (data) => api.put('/brand', data).then((res) => res.data);
