import { SxProps, Theme } from '@mui/material';

export const layoutBox: SxProps<Theme> = {
  display: 'flex',
};

export const appBar: SxProps<Theme> = {
  backgroundColor: 'grey',
  zIndex: (theme) => theme.zIndex.drawer + 1,
};

export const appBarToolbar: SxProps<Theme> = {
  width: 1,
  justifyContent: 'space-between',
};

export const menuAvatar: SxProps<Theme> = {
  mr: 1,
};

export const menuItemLink: SxProps<Theme> = {
  borderRadius: '0 36px 36px 0',
  '&.active': {
    backgroundColor: 'lightgrey',
  },
};

export const drawer: SxProps<Theme> = {
  width: 180,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: 180,
    boxSizing: 'border-box',
  },
};

export const drawerBox: SxProps<Theme> = {
  overflow: 'auto',
};

export const listItemButton: SxProps<Theme> = {
  borderRadius: '0 48px 48px 0',
  '&.active': {
    backgroundColor: 'lightgrey',
  },
};

export const mainContentBox: SxProps<Theme> = {
  flexGrow: 1,
  p: 3,
};
