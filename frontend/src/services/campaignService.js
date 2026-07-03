import api from './api';

export const getCampaigns = (params) => api.get('/campaigns', { params }).then((res) => res.data);
export const getCampaignById = (id) => api.get(`/campaigns/${id}`).then((res) => res.data);
export const createCampaign = (data) => api.post('/campaigns', data).then((res) => res.data);
export const updateCampaign = (id, data) =>
  api.put(`/campaigns/${id}`, data).then((res) => res.data);
export const deleteCampaign = (id) => api.delete(`/campaigns/${id}`).then((res) => res.data);
