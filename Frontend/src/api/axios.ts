
import axios from 'axios';

const envUrl = (import.meta.env.VITE_API_URL || '').trim();
const needsProxy = typeof window !== 'undefined' && window.location.protocol === 'https:' && envUrl.startsWith('http://');
const baseURL = needsProxy ? '/api' : (envUrl || '/api');

export const api = axios.create({
  baseURL: baseURL
});

api.interceptors.request.use((req) => {
  return req;
});

api.interceptors.response.use((response) => {
  return response;
});
