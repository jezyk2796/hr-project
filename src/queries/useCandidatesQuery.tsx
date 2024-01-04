import { useQuery } from '@tanstack/react-query';

import { getCandidates } from '../api/getCandidates';

export const CANDIDATES_QUERY_KEY = ['CANDIDATES-QUERY-KEY'];

export const useCandidatesQuery = () => {
  return useQuery(CANDIDATES_QUERY_KEY, getCandidates);
};
