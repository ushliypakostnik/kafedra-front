const isProd = process.env.NODE_ENV === 'production';
const apiUrl = process.env.VUE_APP_API_URL;
export const API_URL = isProd ? apiUrl || 'https://express-auth.kafedra.org' : apiUrl || 'http://localhost:8082';
