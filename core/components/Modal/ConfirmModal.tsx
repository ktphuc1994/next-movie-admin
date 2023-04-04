import { useState } from 'react';

// import types and interfaces
import { InterfaceConfirmModalComponents } from '../../interface/components/movieList.interface';

// import MUI components
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

const ConfirmModal = ({
  open,
  handleClose,
  handleConfirm,
  confirmContent,
}: InterfaceConfirmModalComponents) => {
  const [loading, setLoading] = useState(false);

  const handleOK = async () => {
    setLoading(true);
    await handleConfirm();
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">Xác nhận</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="confirm-dialog-description"
          sx={{ fontSize: '1.1rem' }}
        >
          {confirmContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Hủy
        </Button>
        <LoadingButton
          variant="contained"
          color="error"
          loading={loading}
          onClick={handleOK}
        >
          Xác nhận
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
