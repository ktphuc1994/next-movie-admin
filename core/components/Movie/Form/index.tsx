import {
  FormEvent,
  KeyboardEvent,
  forwardRef,
  ReactElement,
  Ref,
  useRef,
} from 'react';

// import types and interfaces
import { InterfaceMovieFormComponents } from '../../../interface/components/index.interface';
import moment, { Moment } from 'moment';

// import MUI Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers';
import { InterfaceMovieFormData } from '../../../interface/models/movie';
import { Autocomplete } from '@mui/material';
import { danhGiaOption } from '../../../constants/default.const';

const defaultMovieDetail = {
  maPhim: 0,
  tenPhim: '',
  trailer: '',
  hinhAnh: '',
  moTa: '',
  ngayKhoiChieu: '',
  danhGia: 0,
  hot: false,
  dangChieu: false,
  sapChieu: true,
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MovieForm = ({
  dialogOpen,
  setDialogOpen,
  movieDetail = defaultMovieDetail,
}: InterfaceMovieFormComponents) => {
  const ngayKhoiChieuRef = useRef<Moment | null>(null);

  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleDanhGiaKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      // Prevent's default 'Enter' behavior.
      event.preventDefault();
      // your handler code
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let newFormData = [];
    for (const [key, value] of formData.entries()) {
      switch (key) {
        case 'hot':
          newFormData.push([key, true]);
          break;
        case 'dangChieu':
          const dangChieuValue = value === 'true' ? true : false;
          newFormData.push([key, dangChieuValue]);
          newFormData.push(['sapChieu', !dangChieuValue]);
          break;
        default:
          newFormData.push([key, value]);
          break;
      }
    }
    const formJson = Object.fromEntries(newFormData) as InterfaceMovieFormData;
    let hot: boolean;
    formJson.hot ? (hot = true) : (hot = false);
    console.log('Form data: ', formJson);
  };

  return (
    <Dialog
      fullScreen
      open={dialogOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
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
            Movie Details
          </Typography>
          <Button color="inherit" form="movie-form" type="submit">
            Create
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="div" sx={{ p: { xs: '1rem', sm: '1.5rem' } }}>
        {movieDetail.maPhim !== 0 ? (
          <Typography component="p">
            Mã phim:{' '}
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {movieDetail.maPhim}
            </Typography>
          </Typography>
        ) : null}
        <Box component="form" id="movie-form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="tenPhim"
                required
                fullWidth
                id="tenPhim-form"
                label="Tên phim"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="trailer"
                required
                fullWidth
                id="trailer-form"
                label="Trailer URL"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="hinhAnh"
                required
                fullWidth
                id="hinhAnh-form"
                label="Hình ảnh URL"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="moTa"
                required
                fullWidth
                multiline
                maxRows={20}
                id="moTa-form"
                label="Mô tả"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DatePicker
                label="Ngày khởi chiếu"
                format="DD/MM/YYYY"
                slotProps={{
                  textField: { fullWidth: true },
                  actionBar: { actions: ['clear'] },
                }}
                onChange={(newValue: Moment | null) => {
                  ngayKhoiChieuRef.current = newValue;
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="dangChieu-form-label">Tình trạng</InputLabel>
                <Select
                  labelId="dangChieu-form-label"
                  id="dangChieu-form"
                  label="Tình trạng"
                  name="dangChieu"
                  defaultValue="false"
                >
                  <MenuItem value="true">Đang chiếu</MenuItem>
                  <MenuItem value="false">Sắp chiếu</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <Autocomplete
                disablePortal
                onKeyDown={handleDanhGiaKeyDown}
                id="danhGia-form"
                options={danhGiaOption}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    name="danhGia"
                    label="Đánh giá"
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <FormControlLabel
                control={<Checkbox name="hot" value={'true'} color="primary" />}
                label="hot"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MovieForm;
