import { ReactElement, useRef } from 'react';
import { NextPageWithLayout } from './_app';

// import local service
import movieServ from '../core/services/movieServ';

// import local library
import useSWR, { mutate } from 'swr';

// import types and interfaces
import { Moment } from 'moment';

// import local components
import Layout from '../core/HOC/Layout';

// import MUI components
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Home: NextPageWithLayout = () => {
  const tenPhimRef = useRef<HTMLInputElement | null>(null);
  const fromDateRef = useRef<Moment | null>(null);
  const toDateRef = useRef<Moment | null>(null);
  const { data } = useSWR('movieList', () => {
    const tenPhim = tenPhimRef.current?.value ?? '';
    return movieServ.getMoviePagi(
      tenPhim,
      fromDateRef.current ?? undefined,
      toDateRef.current ?? undefined
    );
  });

  console.log({ data });

  const handleSearch = () => {
    mutate('movieList');
  };
  const handleResetTenPhim = () => {
    tenPhimRef.current ? (tenPhimRef.current.value = '') : null;
  };

  return (
    <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        size="small"
        margin="none"
        id="tenPhimInput"
        label="Tên phim"
        name="tenPhim"
        type="text"
        defaultValue=""
        inputRef={tenPhimRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="tenPhim-reset"
                onClick={handleResetTenPhim}
                edge="end"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <DatePicker
        label="Từ ngày"
        format="DD/MM/YYYY"
        slotProps={{ textField: { size: 'small' } }}
        onChange={(newValue: Moment | null) => {
          fromDateRef.current = newValue;
        }}
      />
      <DatePicker
        label="Đến ngày"
        format="DD/MM/YYYY"
        slotProps={{
          textField: { size: 'small' },
          actionBar: { actions: ['clear'] },
        }}
        onChange={(newValue: Moment | null) => {
          toDateRef.current = newValue;
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Movies List"
      description="A simple admin page for movie management"
    >
      {page}
    </Layout>
  );
};

export default Home;
