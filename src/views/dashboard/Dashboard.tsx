import { Grid, Paper, Typography, Box, Container, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { Layout } from '../../components/layout/Layout';
import { useJobsQuery } from '../../queries/useJobsQuery';
import { useCandidatesQuery } from '../../queries/useCandidatesQuery';
import { AnimatedNumber } from '../../utils/AnimatedNumber';

import * as styles from './Dashboard.styles';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export const Dashboard = () => {
  const { data: jobsData } = useJobsQuery();
  const { data: candidatesData } = useCandidatesQuery();

  return (
    <Layout>
      <Helmet>
        <title>HR Dashboard - Dashboard</title>
      </Helmet>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Item sx={styles.gridItem}>
            <Typography variant="h6">Open positions</Typography>
            <Typography variant="h6">
              {jobsData ? <AnimatedNumber value={jobsData.length} /> : '--'}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item sx={styles.gridItem}>
            <Typography variant="h6">Candidates</Typography>
            <Typography variant="h6">
              {candidatesData ? (
                <AnimatedNumber value={candidatesData.length} />
              ) : (
                '--'
              )}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item sx={styles.gridItem}>
            <Typography variant="h6">General</Typography>
            <Typography>
              <b>Total 48.5% growth</b> 😎 this month
            </Typography>
            <Box sx={styles.generalBox}>
              <Container disableGutters sx={styles.avatarContainer}>
                <Avatar variant="rounded" sx={{ bgcolor: 'royalblue' }}>
                  <PersonOutlineIcon />
                </Avatar>
                <Container>
                  <Typography variant="caption" sx={{ color: 'darkgray' }}>
                    Employees
                  </Typography>
                  <Typography variant="h6" sx={styles.animatedHeader}>
                    <AnimatedNumber value={245} />
                    <span>k</span>
                  </Typography>
                </Container>
              </Container>
              <Container disableGutters sx={styles.avatarContainer}>
                <Avatar variant="rounded" sx={{ bgcolor: 'mediumseagreen' }}>
                  <PersonOutlineIcon />
                </Avatar>
                <Container>
                  <Typography variant="caption" sx={{ color: 'darkgray' }}>
                    Candidates
                  </Typography>
                  <Typography variant="h6">
                    {candidatesData ? (
                      <AnimatedNumber value={candidatesData.length} />
                    ) : (
                      '--'
                    )}
                  </Typography>
                </Container>
              </Container>
              <Container disableGutters sx={styles.avatarContainer}>
                <Avatar variant="rounded" sx={{ bgcolor: 'gold' }}>
                  <PersonOutlineIcon />
                </Avatar>
                <Container>
                  <Typography variant="caption" sx={{ color: 'darkgray' }}>
                    Employees
                  </Typography>
                  <Typography variant="h6" sx={styles.animatedHeader}>
                    <AnimatedNumber value={245} />
                    <span>k</span>
                  </Typography>
                </Container>
              </Container>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Layout>
  );
};
