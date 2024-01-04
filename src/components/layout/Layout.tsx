import { ReactNode, useState } from 'react';
import {
  Box,
  Container,
  AppBar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Drawer,
  Toolbar,
} from '@mui/material';
import {
  PersonOutline,
  Logout,
  HomeOutlined,
  ChatBubbleOutlineOutlined,
  PersonOutlineOutlined,
  CalendarMonthOutlined,
} from '@mui/icons-material';
import { useNavigate, NavLink } from 'react-router-dom';

import { AppRoute } from '../../AppRoute';
import { getInitials } from '../../utils/getInitials';
import { formatFullName } from '../../utils/formatFullName';
import { useUserQuery } from '../../queries/useUserQuery';
import { tokenStorage } from '../../utils/TokenStorage';

import * as styles from './Layout.styles';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { data, isLoading, isError } = useUserQuery();
  const navigate = useNavigate();

  const [avatarMenuAnchorEl, setAvatarMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpened = Boolean(avatarMenuAnchorEl);
  const avatarButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarMenuAnchorEl(e.currentTarget);
  };
  const closeMenu = () => {
    setAvatarMenuAnchorEl(null);
  };

  const logout = () => {
    tokenStorage.clear();
    navigate(AppRoute.home);
  };

  if (isLoading || isError) {
    return null;
  }

  const initials = getInitials(data.firstName, data.lastName);

  return (
    <Box sx={styles.layoutBox}>
      <AppBar sx={styles.appBar}>
        <Toolbar sx={styles.appBarToolbar}>
          <Typography variant="h5" component="h1">
            HR_Analytics
          </Typography>
          <IconButton onClick={avatarButtonClick} size="small">
            <Avatar>{initials.toLowerCase()}</Avatar>
          </IconButton>
          <Menu
            anchorEl={avatarMenuAnchorEl}
            open={isMenuOpened}
            onClose={closeMenu}
          >
            <MenuItem>
              <ListItemIcon>
                <Avatar sx={styles.menuAvatar}>{initials.toLowerCase()}</Avatar>
              </ListItemIcon>
              <ListItemText>
                {formatFullName(data.firstName, data.lastName)}
              </ListItemText>
            </MenuItem>
            <MenuItem
              to={AppRoute.profile}
              component={NavLink}
              sx={styles.menuItemLink}
            >
              <ListItemIcon>
                <PersonOutline />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={logout} sx={styles.menuItemLink}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={styles.drawer}>
        <Toolbar />
        <Box sx={styles.drawerBox}>
          <List>
            <ListItemButton
              to={AppRoute.dashboard}
              component={NavLink}
              sx={styles.listItemButton}
            >
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
            <ListItemButton
              to={AppRoute.jobs}
              component={NavLink}
              sx={styles.listItemButton}
            >
              <ListItemIcon>
                <ChatBubbleOutlineOutlined />
              </ListItemIcon>
              <ListItemText>Jobs</ListItemText>
            </ListItemButton>
            <ListItemButton sx={styles.listItemButton}>
              <ListItemIcon>
                <PersonOutlineOutlined />
              </ListItemIcon>
              <ListItemText>Candidates</ListItemText>
            </ListItemButton>
            <ListItemButton sx={styles.listItemButton}>
              <ListItemIcon>
                <CalendarMonthOutlined />
              </ListItemIcon>
              <ListItemText>Calendar</ListItemText>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={styles.mainContentBox}>
        <Toolbar />
        <Container>{children}</Container>
      </Box>
    </Box>
  );
};
