import { ReactElement, Ref, forwardRef, memo, useState } from 'react';

// import types and interfaces
import { InterfaceUserFormComponents } from 'core/interface/components/userList.interface';

// import local components
import UserFormContent from './UserFormContent';
import CustomCollapse from '../Utils/Collapse/CustomCollapse';

// import MUI components
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserForm = memo(
  ({
    open,
    handleClose,
    handleOK,
    handleDelete,
    defaultUser,
  }: InterfaceUserFormComponents) => {
    const [buttonLoading, setButtonLoading] = useState(false);

    // handle delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false);

    const onDeleteConfirm = async () => {
      setButtonLoading(true);
      if (defaultUser.taiKhoan) {
        try {
          await handleDelete(defaultUser.taiKhoan);
          setDeleteOpen(false);
        } finally {
          setButtonLoading(false);
        }
      }
    };

    // handle form event
    const onClose = () => {
      handleClose();
    };

    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'fixed' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Thông tin người dùng
            </Typography>
            <LoadingButton
              color="inherit"
              form="user-form"
              type="submit"
              loading={buttonLoading}
            >
              <span>
                {defaultUser.taiKhoan ? 'Cập nhật' : 'Thêm'} người dùng
              </span>
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <UserFormContent
          defaultUser={defaultUser}
          handleOK={handleOK}
          setButtonLoading={setButtonLoading}
        />
        {defaultUser.taiKhoan ? (
          <>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{ px: { xs: '1rem', sm: '1.5rem' } }}>
              <CustomCollapse
                titleSx={{ backgroundColor: 'red' }}
                title="DANGER ZONE"
              >
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  color="error"
                  onClick={() => setDeleteOpen(true)}
                >
                  Delete User
                </Button>
              </CustomCollapse>
            </Box>
            <Dialog
              open={deleteOpen}
              onClose={() => setDeleteOpen(false)}
              aria-labelledby="delete-form-dialog"
              aria-describedby="delete-form-details"
            >
              <DialogTitle id="delete-form-dialog">Xác nhận</DialogTitle>
              <DialogContent>
                <DialogContentText id="delete-form-details">
                  Bạn có chắc chắn muốn xóa người dùng{' '}
                  <span style={{ fontWeight: 700 }}>{defaultUser.hoTen}</span>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteOpen(false)}
                >
                  Hủy
                </Button>
                <LoadingButton
                  loading={buttonLoading}
                  variant="contained"
                  color="error"
                  onClick={onDeleteConfirm}
                >
                  OK
                </LoadingButton>
              </DialogActions>
            </Dialog>
          </>
        ) : null}
      </Dialog>
    );
  }
);

export default UserForm;
