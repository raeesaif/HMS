import apiClient from '@/lib/apiClient';

export const authAPI = {
  login: async (data) => {
    const response = await apiClient.post('/auth/login', data);
    // backend nests { token, refreshToken, user } under `data`; normalize `token` -> `accessToken`
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
};
