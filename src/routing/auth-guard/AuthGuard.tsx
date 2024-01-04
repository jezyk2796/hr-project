import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { useUserQuery } from '../../queries/useUserQuery';
import { AppRoute } from '../../AppRoute';

export const AuthGuard = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useUserQuery();

  useEffect(() => {
    if (!isLoading && !isSuccess) {
      navigate(AppRoute.home);
    }
  }, [isSuccess, isLoading, navigate]);

  if (isLoading || !isSuccess) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return <Outlet />;
};
