
import axios from 'axios';

const baseURL = (import.meta.env.VITE_API_URL || '').trim();

export const api = axios.create({
  baseURL: baseURL
});

api.interceptors.request.use((req) => {
  return req;
});

api.interceptors.response.use((response) => {
  return response;
});
