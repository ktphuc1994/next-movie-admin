import Link from 'next/link';

// import MUI components
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const AlreadyLogin = () => {
  return (
    <>
      <LockOpenIcon fontSize="large" sx={{ mb: '0.5rem' }} />
      <Typography component="h1" variant="h5" mb="0.5rem">
        Bạn đã đăng nhập. Tiến về trang chủ thôi.
      </Typography>
      <Button
        fullWidth
        LinkComponent={Link}
        href="/"
        variant="contained"
        color="error"
      >
        Trang chủ
      </Button>
    </>
  );
};

export default AlreadyLogin;
