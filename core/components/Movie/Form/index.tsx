import {
  memo,
  FormEvent,
  KeyboardEvent,
  forwardRef,
  ReactElement,
  Ref,
  useRef,
  useState,
} from 'react';

// import local library
import { mutate } from 'swr';
import { toast } from 'react-toastify';
import moment, { Moment } from 'moment';

// import types and interfaces
import {
  InterfaceMovieCreate,
  InterfaceMovieUpdate,
} from 'core/interface/models/movie';
import { InterfaceMovieFormComponents } from 'core/interface/components/movieList.interface';

// import local constants
import {
  danhGiaOption,
  defaultMovieDetail,
} from 'core/constants/default.const';

// import local service
import movieServ from 'core/services/movieServ';

// import local utilities
import { axiosErrorHandling } from 'core/utilities';

// import local components
import DropUpload from '../../Utils/DropUpload';

// import MUI Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
import { Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const handleDanhGiaKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
  if (event.key === 'Enter') {
    // Prevent's default 'Enter' behavior.
    event.preventDefault();
    // handler code if any
  }
};

const MovieForm = memo(
  ({
    movieFormOpen,
    setMovieFormOpen,
    movieDetail = defaultMovieDetail,
  }: InterfaceMovieFormComponents) => {
    const ngayKhoiChieuRef = useRef<Moment | null>(null);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const handleClose = () => {
      setMovieFormOpen(false);
    };

    const handleMovieMutate = (
      method: 'createMovie' | 'updateMovie',
      info: InterfaceMovieUpdate & InterfaceMovieCreate
    ) => {
      const notify = method === 'createMovie' ? 'Tạo' : 'Cập nhật';
      movieServ[method](info)
        .then(() => {
          mutate('moviePagi');
          toast.success(`${notify} phim thành công`, {
            toastId: 'create-movie-success',
          });
          setMovieFormOpen(false);
        })
        .catch(axiosErrorHandling)
        .finally(() => {
          setButtonLoading(false);
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setButtonLoading(true);
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
          case 'danhGia':
            if (value === '') break;
            newFormData.push([key, +value]);
            break;
          default:
            if (value === '') break;
            newFormData.push([key, value]);
            break;
        }
      }

      const formJson = Object.fromEntries(newFormData) as InterfaceMovieCreate &
        InterfaceMovieUpdate;

      if (ngayKhoiChieuRef.current) {
        formJson.ngayKhoiChieu = moment(ngayKhoiChieuRef.current).toISOString();
      }
      if (!formJson.hot) {
        formJson.hot = false;
      }
      let method: 'updateMovie' | 'createMovie';
      if (movieDetail.maPhim) {
        formJson.maPhim = movieDetail.maPhim;
        method = 'updateMovie';
      } else {
        method = 'createMovie';
      }

      handleMovieMutate(method, formJson);
    };

    return (
      <Dialog
        fullScreen
        open={movieFormOpen}
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
              form="movie-form"
              type="submit"
              loading={buttonLoading}
            >
              <span>{movieDetail.maPhim ? 'Cập nhật' : 'Tạo'} phim</span>
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <Box component="div" sx={{ p: { xs: '1rem', sm: '1.5rem' } }}>
          <Toolbar />
          {movieDetail.maPhim ? (
            <Typography component="p" sx={{ mb: '1.5rem' }}>
              Mã phim:{' '}
              <Typography
                component="span"
                sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
              >
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
                  defaultValue={movieDetail.tenPhim}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="trailer"
                  required
                  fullWidth
                  id="trailer-form"
                  label="Trailer URL"
                  defaultValue={movieDetail.trailer}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="hinhAnh"
                  fullWidth
                  id="hinhAnh-form"
                  label="Hình ảnh URL"
                  defaultValue={movieDetail.hinhAnh}
                />
              </Grid>
              <Grid item xs={12}>
                <DropUpload defaultURL={movieDetail.hinhAnh} />
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
                  defaultValue={movieDetail.moTa}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DatePicker
                  label="Ngày khởi chiếu"
                  format="DD/MM/YYYY"
                  defaultValue={
                    movieDetail.ngayKhoiChieu
                      ? moment(movieDetail.ngayKhoiChieu)
                      : undefined
                  }
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
                    required
                    defaultValue={movieDetail.dangChieu.toString()}
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
                  defaultValue={movieDetail.danhGia?.toString()}
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
                  control={
                    <Checkbox
                      name="hot"
                      value={'true'}
                      defaultChecked={movieDetail.hot ?? false}
                      color="primary"
                    />
                  }
                  label="hot"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    );
  }
);

export default MovieForm;
