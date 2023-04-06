import { memo } from 'react';

// import types and interfaces
import { InterfaceUserFilterComponent } from 'core/interface/components/userList.interface';

// import MUI components
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
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
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const handleClose = () => {
      setOpen(false);
    };

    if (matches)
      return (
        <Drawer
          variant="permanent"
          anchor="right"
          PaperProps={{ sx: { position: 'relative', border: 'none' } }}
          open={open}
          sx={{
            height: '100%',
          }}
        >
          <Box>
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
            <UserFilterContent setFilterInfo={setFilterInfo} />
          </Box>
        </Drawer>
      );

    return (
      <MuiDrawer
        variant="temporary"
        anchor="right"
        open={open}
        onClose={handleClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
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
    );
  }
);

export default UserFilter;
