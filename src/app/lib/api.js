import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://frontend-assignment-api.misc.simplismart.ai/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
