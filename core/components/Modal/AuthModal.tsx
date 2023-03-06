import Link from 'next/link';

// import MUI Components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import localServ from '../../services/localServ';

const AuthModal = ({ open, message }: { open: boolean; message: string }) => {
  const handleLogin = () => {
    localServ.removeToken();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Lỗi nhận dạng người dùng
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: '1.5rem', pb: '1.5rem' }}>
        <Button
          LinkComponent={Link}
          href="/login"
          onClick={handleLogin}
          variant="contained"
          color="error"
          autoFocus
        >
          Đăng nhập
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
