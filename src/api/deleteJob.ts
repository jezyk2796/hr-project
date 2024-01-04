import { axiosClient } from './apiClient';

export const deleteJobRequest = async (id: string) => {
  await axiosClient.delete(`/jobs/${id}`);
};
