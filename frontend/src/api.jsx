import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050/api',
  withCredentials: true, // keep it true if your backend uses cookies
});

export default api;
