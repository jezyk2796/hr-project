import { JobPart } from '../types/types';

import { axiosClient } from './apiClient';

export const editJobRequest = async ({ id, ...payload }: Partial<JobPart>) => {
  const { data } = await axiosClient.patch<JobPart>(`/jobs/${id}`, payload);

  return data;
};
