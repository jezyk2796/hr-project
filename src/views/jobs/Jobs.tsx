import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useState, useMemo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { deleteJobRequest } from '../../api/deleteJob';
import { Layout } from '../../components/layout/Layout';
import { useJobsQuery, JOBS_QUERY_KEY } from '../../queries/useJobsQuery';
import { usePagination } from '../../utils/UsePagination';
import { formatDate } from '../../utils/formatDate';
import { AppRoute } from '../../AppRoute';
import { Job } from '../../types/types';

import * as styles from './Jobs.styles';

export const Jobs = () => {
  const { data, refetch, isError, isLoading } = useJobsQuery();
  const { page, rowsPerPage, handlePageChange, handleChangeRowsPerPage } =
    usePagination({
      defaultRowsPerPage: 5,
    });
  const [selected, setSelected] = useState<string[]>([]);
  const [action, setAction] = useState('actions');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [debouncedValue] = useDebounce(searchInputValue, 300);
  const queryClient = useQueryClient();

  const deleteJobMutation = useMutation(deleteJobRequest, {
    onSuccess: (response, id) => {
      queryClient.setQueryData<Job[]>(JOBS_QUERY_KEY, (cachedData) => {
        if (!cachedData) {
          return undefined;
        }

        return cachedData.filter((item) => item.id !== id);
      });

      refetch();
    },
  });

  const filteredData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    if (debouncedValue.length >= 3) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(debouncedValue),
      );
    }

    return data;
  }, [data, debouncedValue]);

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      handlePageChange(0);
    }
  }, [debouncedValue.length, handlePageChange]);

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleSelectAllClick = (isChecked: boolean) => {
    if (!filteredData) {
      return;
    }
    if (isChecked) {
      const newSelected = filteredData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (id: string) => {
    if (selected.includes(id)) {
      const newSelected = selected.filter((item) => item !== id);
      setSelected(newSelected);
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleDeleteClick = (id: string) => {
    deleteJobMutation.mutate(id);
  };

  const isSelected = (id: string) => {
    return selected.indexOf(id) !== -1;
  };

  const handleActionSelect = (event: SelectChangeEvent) => {
    setAction(event.target.value);
    if (event.target.value === 'delete') {
      selected.forEach((item) => {
        deleteJobMutation.mutate(item);
      });
      setSelected([]);
      setAction('actions');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  return (
    <Layout>
      <Helmet>
        <title>HR Dashboard - Jobs</title>
      </Helmet>
      <Box sx={styles.mainContainer}>
        <Box sx={styles.controlsContainer}>
          <Box>
            <FormControl disabled={selected.length === 0}>
              <Select value={action} onChange={handleActionSelect}>
                <MenuItem value="actions">Actions</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="search"
              variant="outlined"
              label="Search job"
              value={searchInputValue}
              onChange={handleSearch}
              sx={styles.searchInput}
            />
          </Box>
          <Button variant="contained" to={AppRoute.addJob} component={NavLink}>
            Add
          </Button>
        </Box>
        {filteredData ? (
          <Paper sx={styles.tablePaper}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onChange={(e) => handleSelectAllClick(e.target.checked)}
                        indeterminate={
                          selected.length > 0 && selected.length < data.length
                        }
                        checked={
                          data.length > 0 && selected.length === data.length
                        }
                      />
                    </TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = isSelected(row.id);

                      return (
                        <TableRow
                          role="checkbox"
                          hover
                          key={row.id}
                          selected={isItemSelected}
                          tabIndex={-1}
                          onClick={() => handleRowClick(row.id)}
                          sx={styles.tableRow}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                            />
                          </TableCell>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{formatDate(row.createdAt)}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDeleteClick(row.id);
                              }}
                            >
                              <Delete />
                            </IconButton>
                            <IconButton
                              to={`/jobs/${row.id}`}
                              component={NavLink}
                            >
                              <Visibility />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredData.length}
              onPageChange={(_e, newPage) => handlePageChange(newPage)}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 15]}
              onRowsPerPageChange={(e) =>
                handleChangeRowsPerPage(e.target.value)
              }
            />
          </Paper>
        ) : (
          <Typography variant="h4">Brak danych</Typography>
        )}
      </Box>
    </Layout>
  );
};
