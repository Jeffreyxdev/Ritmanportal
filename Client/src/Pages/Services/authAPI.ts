import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

interface AuthCredentials {
  email: string;
  password: string;
}

export const loginUser = (credentials: AuthCredentials) =>
  API.post('/auth/login', credentials);

export const registerUser = (credentials: AuthCredentials) =>
  API.post('/auth/register', credentials);

export default API;
