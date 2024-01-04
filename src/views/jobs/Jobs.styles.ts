import { SxProps, Theme } from '@mui/material';

export const mainContainer: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
};

export const controlsContainer: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 1,
  mb: 3,
};

export const searchInput: SxProps<Theme> = {
  ml: 2,
};

export const tablePaper: SxProps<Theme> = {
  width: '100%',
};

export const tableRow: SxProps<Theme> = {
  cursor: 'pointer',
};
