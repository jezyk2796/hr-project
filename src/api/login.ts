import { axiosClient } from './apiClient';

type LoginRequestPayload = {
  login: string;
  password: string;
  rememberUser: boolean;
};

export const loginRequest = async (payload: LoginRequestPayload) => {
  const { data } = await axiosClient.post<string>('/auth/basic-login', {
    email: payload.login,
    password: payload.password,
  });

  return data;
};
