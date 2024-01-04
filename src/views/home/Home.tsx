import { Box, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import { ExpandableList } from '../../components/list/ExpandableList';
import { getTechnologiesData } from '../../api/GetTechnologiesData';

import * as styles from './Home.styles';

const TechnologiesData = () => {
  const { data, isLoading, isError } = useQuery(
    ['TECHNOLOGIES-DATA'],
    getTechnologiesData,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const mapObj = data.languages.map((language) => ({
    content: language.name,
    sublist: language.frameworks?.map((framework) => ({
      content: framework.name,
      sublist: framework.levels?.map((level) => ({
        content: level.name,
        sublist: level.projects?.map((project) => ({
          content: project.name,
        })),
      })),
    })),
  }));

  return <ExpandableList level={0} list={mapObj} />;
};

export const Home = () => {
  return (
    <Box sx={styles.mainContainer}>
      <Helmet>
        <title>HR Dashboard - Home</title>
      </Helmet>
      <Paper sx={styles.paperContainer}>
        <Typography variant="h1" sx={styles.header}>
          HR analytics
        </Typography>
        <Box sx={styles.buttonContainer}>
          <Button variant="contained" href="/signin">
            Sign in
          </Button>
          <Button variant="contained" href="/signup">
            Sign up
          </Button>
        </Box>
        <Box sx={styles.listContainer}>
          <Typography variant="h5">
            We&apos;re looking for specialists in those technologies:
          </Typography>
          <TechnologiesData />
        </Box>
      </Paper>
    </Box>
  );
};
