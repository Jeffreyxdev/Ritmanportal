import axios from 'axios';

// Extend ImportMeta interface for Vite env variables
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Base Axios instance
const API = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Request interceptor to attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔐 Auth APIs
interface AuthCredentials {
  email: string;
  password: string;
}

export const loginUser = (credentials: AuthCredentials) => API.post('/auth/login', credentials);
export const registerUser = (credentials: AuthCredentials) => API.post('/auth/register', credentials);

// 🚪 Optional logout trigger on server
// export const logoutUser = () => API.post('/auth/logout');

export default API;
