import { useQuery } from '@tanstack/react-query';

import { getUser } from '../api/getUser';

export const USER_QUERY_KEY = ['USER-QUERY-KEY'];

export const useUserQuery = () => {
  return useQuery(USER_QUERY_KEY, getUser);
};
