import { memo, MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';

// import SWR
import useSWR, { mutate } from 'swr';

// import type and interface
import { InterfaceUser } from '../../interface/models/user';

// import local service
import localServ from '../../services/localServ';

// import MUI components
import {
  Box,
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { Logout } from '@mui/icons-material';

// import local components
import InnerSpinner from '../Spinner/InnerSpinner';
import { toast } from 'react-toastify';

const UserNav = memo(() => {
  const router = useRouter();
  const { data: userInfo } = useSWR<InterfaceUser>('user');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localServ.removeToken();
    toast('Đăng xuất thành công', {
      type: 'info',
      autoClose: 2000,
      toastId: 'layout-logout',
    });
    mutate('user', undefined, false);
    router.push('/login');
  };

  return (
    <Box component="div">
      {!userInfo ? (
        <InnerSpinner size="1rem" thickness={1} />
      ) : (
        <Button
          id="account-menu-button"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {userInfo.hoTen}
        </Button>
      )}
      <Menu
        id="account-menu"
        aria-labelledby="account-menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
});

export default UserNav;
