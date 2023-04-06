import { memo } from 'react';

// import types and interfaces
import { InterfaceUserFilterComponent } from 'core/interface/components/userList.interface';

// import MUI components
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MuiDrawer from '@mui/material/Drawer';
import UserFilterContent from './UserFilterContent';

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const UserFilter = memo(
  ({ open, setOpen, setFilterInfo }: InterfaceUserFilterComponent) => {
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <>
        <Drawer
          variant="permanent"
          anchor="right"
          PaperProps={{ sx: { position: 'relative', border: 'none' } }}
          open={open}
          sx={{
            display: { xs: 'none', md: 'block' },
            height: '100%',
          }}
        >
          <DrawerHeader>
            <Typography
              component="span"
              fontSize="1.5rem"
              fontWeight={700}
              color="primary"
            >
              Filter User
            </Typography>
          </DrawerHeader>
          <Divider />
          <UserFilterContent setOpen={setOpen} setFilterInfo={setFilterInfo} />
        </Drawer>
        <MuiDrawer
          variant="temporary"
          anchor="right"
          open={open}
          onClose={handleClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <DrawerHeader>
            <Typography
              component="span"
              fontSize="1.5rem"
              fontWeight={700}
              color="primary"
            >
              Filter User
            </Typography>
          </DrawerHeader>
          <Divider />
          <UserFilterContent setOpen={setOpen} setFilterInfo={setFilterInfo} />
        </MuiDrawer>
      </>
    );
  }
);

export default UserFilter;
