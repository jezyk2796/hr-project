import { SxProps, Theme } from '@mui/material';

export const mainContainer: SxProps<Theme> = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const paperContainer: SxProps<Theme> = {
  padding: '20px',
  width: '400px',
};

export const header: SxProps<Theme> = {
  fontSize: '30px',
  marginBottom: '10px',
};

export const formContainer: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};

export const signInInfoCaption: SxProps<Theme> = {
  color: 'red',
};
