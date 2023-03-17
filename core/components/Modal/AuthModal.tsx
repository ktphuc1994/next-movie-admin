import Link from 'next/link';

// import SWR
import { mutate } from 'swr';

// import local service
import localServ from '../../services/localServ';

// import MUI Components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AuthModal = ({ open, message }: { open: boolean; message: string }) => {
  const handleLogin = () => {
    localServ.removeToken();
    mutate('user', undefined, false);
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
