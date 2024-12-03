import axios, {AxiosInstance} from 'axios';
import {getToken} from '../utils/storage';

type CustomHeaders = {
  'x-token'?: string;
};

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use(
  async config => {
    const token = await getToken('user');

    config.headers = {
      ...config.headers,
      'x-token': token,
    } as typeof config.headers & CustomHeaders;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
