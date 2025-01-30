import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Backend API
  withCredentials: true, // Ensures cookies (refresh token) are sent
});

export const login = (data: { email: string; password: string }) =>
  API.post('/auth/login', data);

export const register = (data: { email: string; password: string }) =>
  API.post('/auth/register', data);

export const refreshToken = () => API.post('/auth/refresh');

export const logout = () => API.post('/auth/logout');
