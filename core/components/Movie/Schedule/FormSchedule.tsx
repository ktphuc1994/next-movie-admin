import { forwardRef, memo, ReactElement, Ref, useState } from 'react';

// import types and interfaces
import { InterfaceFormScheduleComponent } from 'core/interface/components/movieSchedule.interface';

// import MUI components
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import FormContent from './FormContent';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormSchedule = memo(
  ({ open, setOpen, selectedSchedule }: InterfaceFormScheduleComponent) => {
    const [loading, setLoading] = useState(false);

    // UI handling
    const isUpdate = Boolean(selectedSchedule.maLichChieu);
    const title = isUpdate ? 'Cập nhật' : 'Tạo';

    // FORM control
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'fixed' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Chi tiết lịch chiếu
            </Typography>
            <LoadingButton
              color="inherit"
              form="movie-schedule-form"
              type="submit"
              loading={loading}
            >
              <span>{title} lịch chiếu</span>
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <Box component="div" sx={{ p: { xs: '1rem', sm: '1.5rem' } }}>
          <Toolbar />
          {isUpdate ? (
            <Typography component="p" sx={{ mb: '1.5rem' }}>
              Mã lịch chiếu:{' '}
              <Typography
                component="span"
                sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
              >
                {selectedSchedule.maLichChieu}
              </Typography>
            </Typography>
          ) : null}
          <FormContent
            selectedSchedule={selectedSchedule}
            setOpen={setOpen}
            setLoading={setLoading}
          />
        </Box>
      </Dialog>
    );
  }
);

export default FormSchedule;
