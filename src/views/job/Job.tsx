import { useParams, NavLink } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { Layout } from '../../components/layout/Layout';
import { useJobQuery } from '../../queries/useJobQuery';
import { formatDate } from '../../utils/formatDate';

export const Job = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Expected ID in params.');
  }
  const { data, isError, isLoading } = useJobQuery(id);

  if (isError) {
    return <Typography>No such offer found</Typography>;
  }
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Layout>
      <Helmet>
        <title>HR Dashboard - {data.title}</title>
      </Helmet>
      <Box>
        <Typography variant="h2">Job: {data.title}</Typography>
        <Typography>Company: {data.companyName}</Typography>
        <Typography>Created at: {formatDate(data.createdAt)}</Typography>
        <Typography>Description:</Typography>
        <Typography>{data.longDescription}</Typography>
        <Typography>Status: {data.status}</Typography>
        <Button variant="contained" to={`/jobs/${id}/edit`} component={NavLink}>
          Edit
        </Button>
      </Box>
    </Layout>
  );
};
