import { useQuery } from '@tanstack/react-query';

import { getJob } from '../api/getJob';

export const JOB_QUERY_KEY = ['JOB-QUERY-KEY'];

export const useJobQuery = (id: string) => {
  return useQuery(JOB_QUERY_KEY, () => getJob(id));
};
