import { Job } from '../types/types';

import { axiosClient } from './apiClient';

export const getJob = async (id: string) => {
  const { data } = await axiosClient.get<Job>(`/jobs/${id}`);
  return data;
};
