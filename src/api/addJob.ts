import { JobPart } from '../types/types';

import { axiosClient } from './apiClient';

export const addJobRequest = async (payload: Omit<JobPart, 'id'>) => {
  const { data } = await axiosClient.post('/jobs', payload);

  return data;
};
