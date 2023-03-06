import { Box } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>Logo</div>
      <div>User</div>
    </Box>
  );
};

export default Header;
