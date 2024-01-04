import { Box, CircularProgress, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { JobPart } from '../../types/types';
import { Layout } from '../../components/layout/Layout';
import { JobForm } from '../../components/add-edit-job-form/JobForm';
import { useJobQuery } from '../../queries/useJobQuery';
import { editJobRequest } from '../../api/editJob';
import { AppRoute } from '../../AppRoute';
import { updateDirtyFields } from '../../utils/updateDirtyFields';

export const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editJobMutation = useMutation(editJobRequest, {
    onSuccess: () => {
      navigate(AppRoute.jobs);
      toast.success('Job offer has been edited');
    },
    onError: () => {
      toast.error('error');
    },
  });

  if (!id) {
    throw new Error('Expected ID in params.');
  }

  const { data, isError, isLoading } = useJobQuery(id);

  if (isError) {
    return <Typography>Error</Typography>;
  }
  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  const submitEditJob = (editedJob: Omit<JobPart, 'id'>) => {
    const dirtyFields = updateDirtyFields<Omit<JobPart, 'id'>>(data, editedJob);

    editJobMutation.mutate({
      id,
      ...dirtyFields,
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>HR Dashboard - Edit Job</title>
      </Helmet>
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Edit job
        </Typography>
        <JobForm
          defaultValues={data}
          onSubmit={(val) => submitEditJob(val)}
          isReadOnly={data.status === 'CLOSED'}
        />
      </Box>
    </Layout>
  );
};
