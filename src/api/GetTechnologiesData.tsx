import { axiosClient } from './apiClient';

type Project = {
  name: string;
};

type Level = {
  name: string;
  projects: Project[];
};

type Framework = {
  name: string;
  levels: Level[];
};

type Language = {
  name: string;
  frameworks: Framework[];
};

export type TechnologiesDataResponse = {
  languages: Language[];
};

export const getTechnologiesData = async () => {
  const { data } = await axiosClient.get<TechnologiesDataResponse>(
    '/jobs/public',
  );
  return data;
};
