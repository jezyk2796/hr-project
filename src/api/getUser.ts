import { axiosClient } from './apiClient';

type User = {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  updatedAt: string;
};

export const getUser = async () => {
  const { data } = await axiosClient.get<User>('/users/me');
  return data;
};
