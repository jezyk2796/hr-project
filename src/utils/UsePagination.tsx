import { useState } from 'react';

type UsePaginationProp = {
  defaultRowsPerPage: number;
};

export const usePagination = ({ defaultRowsPerPage }: UsePaginationProp) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (rowsAmount: string) => {
    setRowsPerPage(parseInt(rowsAmount, 10));
    setPage(0);
  };

  return { page, handlePageChange, rowsPerPage, handleChangeRowsPerPage };
};
