import api from './api';

export const getCreators = (params) => api.get('/creators', { params }).then((res) => res.data);
export const getCreatorById = (id) => api.get(`/creators/${id}`).then((res) => res.data);
export const getMyCreatorProfile = () => api.get('/creators/me/profile').then((res) => res.data);
export const updateCreatorProfile = (data) =>
  api.put('/creators/profile', data).then((res) => res.data);
