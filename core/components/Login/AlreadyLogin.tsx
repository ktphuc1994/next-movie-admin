import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';

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
