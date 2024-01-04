import { useQuery } from '@tanstack/react-query';

import { getJobs } from '../api/getJobs';

export const JOBS_QUERY_KEY = ['JOBS-QUERY-KEY'];

export const useJobsQuery = () => {
  return useQuery(JOBS_QUERY_KEY, getJobs, {
    select: (data) =>
      data.filter((job) => {
        return job.status === 'OPEN';
      }),
  });
};
