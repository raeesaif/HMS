import apiClient from '@/lib/apiClient';

export const authAPI = {
  login: async (data) => {
    const response = await apiClient.post('/auth/login', data);
    const { token, refreshToken, user } = response.data.data;
    return { accessToken: token, refreshToken, user };
  },
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data.data;
  },
  register: async (data) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data.data.user;
  },
  getDoctors: async (departmentId) => {
    const response = await apiClient.get('/auth/doctors', { params: { department: departmentId } });
    return response.data.data;
  },
  getNurses: async () => {
    const response = await apiClient.get('/auth/nurses');
    return response.data.data;
  },
  getReceptionists: async () => {
    const response = await apiClient.get('/auth/receptionists');
    return response.data.data;
  },
  getPatients: async () => {
    const response = await apiClient.get('/auth/patients');
    return response.data.data;
  },
  updatePassword: async (data) => {
    const response = await apiClient.patch('/auth/update-password', data);
    return response.data.data;
  },
};
