import axios from 'axios';
export const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_DOMAIN_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `VK ${btoa(window.location.search)}`,
    },
  });
  instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
export const makeRequest = async (method, url, params) => {
        try {
          const response = await instance({
            method: method,
            url: url,
            data: params,
          });
      
          return response.data;
        } catch (e) {
          return Promise.reject(e);
        }
      };