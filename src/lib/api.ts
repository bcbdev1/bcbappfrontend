import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  withCredentials: true, // important if using HTTP-only cookies
});

export default apiClient;