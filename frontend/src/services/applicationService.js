import api from './api';

export const applyToCampaign = (data) => api.post('/applications', data).then((res) => res.data);
export const getApplications = (params) =>
  api.get('/applications', { params }).then((res) => res.data);
export const updateApplicationStatus = (id, status) =>
  api.put(`/applications/${id}/status`, { status }).then((res) => res.data);
