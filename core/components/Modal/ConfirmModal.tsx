// import types and interfaces
import { InterfaceConfirmModalComponents } from '../../interface/components/index.interface';

// import MUI components
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ConfirmModal = ({
  open,
  handleClose,
  handleConfirm,
  confirmContent,
}: InterfaceConfirmModalComponents) => {
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
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleConfirm}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
