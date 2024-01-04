import { SxProps, Theme } from '@mui/material';

export const formContainer: SxProps<Theme> = {
  p: 3,
  mt: 3,
};

export const formBox: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};

export const formControl: SxProps<Theme> = {
  margin: 0,
  pt: 3,
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'flex-start',
};

export const formButtonsContainer: SxProps<Theme> = {
  mt: 5,
};

export const formButton: SxProps<Theme> = {
  mr: 2,
};
