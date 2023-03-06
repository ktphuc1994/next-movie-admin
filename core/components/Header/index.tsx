import { InterfaceHeader } from '../../interface/components/index.interface';

// import MUI components
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ sideOpen, setSideOpen }: InterfaceHeader) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        {sideOpen ? null : (
          <IconButton
            onClick={() => {
              setSideOpen(true);
            }}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </div>
      <div>User</div>
    </Box>
  );
};

export default Header;
