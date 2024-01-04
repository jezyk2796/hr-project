import { axiosClient } from './apiClient';

type Candidate = {
  companyName: string;
  createdAt: string;
  id: string;
  logo: string;
  longDescription: string;
  name: string;
  position: string;
  shortDescription: string;
  updatedAt: string;
};

export const getCandidates = async () => {
  const { data } = await axiosClient.get<Candidate[]>('/candidates');
  return data;
};
