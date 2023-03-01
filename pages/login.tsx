import { LockPerson } from '@mui/icons-material';
import { Box } from '@mui/material';

const LoginPage = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'url(./login-bg.webp)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '50%',
          height: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(5px)',
          borderRadius: '12px',
          padding: '2rem',
        }}
      >
        <LockPerson fontSize="large" />
      </Box>
    </Box>
  );
};

export default LoginPage;
