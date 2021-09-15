import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

let token: string | null =  sessionStorage.getItem('auth-token');

if (token) {
     api.defaults.headers.common['x-auth-token'] = token;
} else {
     api.defaults.headers.common['x-auth-token'] = null;
}

api.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = sessionStorage.getItem('auth-token');            
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return api(originalRequest);
  }
  return Promise.reject(error);
});

export default api;
