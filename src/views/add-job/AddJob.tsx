import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { JobPart } from '../../types/types';
import { Layout } from '../../components/layout/Layout';
import { JobForm } from '../../components/add-edit-job-form/JobForm';
import { addJobRequest } from '../../api/addJob';
import { AppRoute } from '../../AppRoute';

export const AddJob = () => {
  const navigate = useNavigate();

  const addJobMutation = useMutation(addJobRequest, {
    onSuccess: () => {
      navigate(AppRoute.jobs);
      toast.success('New job offer has been added');
    },
    onError: () => {
      toast.error('error');
    },
  });

  const submitAddJob = (addedJob: Omit<JobPart, 'id'>) => {
    addJobMutation.mutate({
      ...addedJob,
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>HR Dashboard - Add Job</title>
      </Helmet>
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Add job
        </Typography>
        <JobForm onSubmit={(data) => submitAddJob(data)} />
      </Box>
    </Layout>
  );
};
