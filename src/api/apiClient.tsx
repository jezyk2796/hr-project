import axios, { InternalAxiosRequestConfig } from 'axios';

import { tokenStorage } from '../utils/TokenStorage';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:9595',
});

const requestSuccessInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const accessToken = tokenStorage.get();
  const configCopy = { ...config };

  if (accessToken) {
    configCopy.headers.Authorization = `Bearer ${accessToken}`;
  }
  return configCopy;
};

axiosClient.interceptors.request.use(requestSuccessInterceptor);
