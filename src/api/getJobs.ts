import { Job } from '../types/types';

import { axiosClient } from './apiClient';

export const getJobs = async () => {
  const { data } = await axiosClient.get<Job[]>('/jobs');
  return data;
};
