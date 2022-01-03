import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_BASE_URL} from 'utils/constants';
import StorageService from './storage';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    if (config.headers) {
      const token = await StorageService.gettingStorage('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      config.headers['Content-Type'] = 'application/json';
      config.headers.Accept = 'application/json';
    }
    return config;
  },
  async (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosError> =>
    Promise.reject(error.response ? error.response.data.error : error),
);
export default axiosInstance;
