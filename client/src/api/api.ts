import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

const token = sessionStorage.getItem('auth-token');

if (token) {
     api.defaults.headers.common['x-auth-token'] = token;
} else {
     api.defaults.headers.common['x-auth-token'] = null;
}

export default api;
