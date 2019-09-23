const isProd = process.env.NODE_ENV === 'production';
const apiUrl = process.env.VUE_APP_API_URL;
export const API_URL = isProd ? apiUrl || 'https://backend.kafedra.org' : apiUrl || 'http://localhost:8082';

export const SESSION_STORAGE = {
  songs: 'songs',
};
