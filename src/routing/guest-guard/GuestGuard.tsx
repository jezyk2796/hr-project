import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { useUserQuery } from '../../queries/useUserQuery';
import { AppRoute } from '../../AppRoute';

export const GuestGuard = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useUserQuery();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate(AppRoute.dashboard);
    }
  }, [isSuccess, isLoading, navigate]);

  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return <Outlet />;
};
