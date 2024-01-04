import { SxProps, Theme } from '@mui/material';

export const mainContainer: SxProps<Theme> = {
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const paperContainer: SxProps<Theme> = {
  padding: '20px',
};

export const header: SxProps<Theme> = {
  fontSize: '70px',
};

export const buttonContainer: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '18px',
  padding: '40px 0 0 0',
};

export const listContainer: SxProps<Theme> = {
  marginTop: '20px',
};
