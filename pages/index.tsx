import { ReactElement, useRef } from 'react';
import { NextPageWithLayout } from './_app';

// import local service
import movieServ from '../core/services/movieServ';

// import local library
import useSWR from 'swr';

// import types and interfaces
import { Moment } from 'moment';

// import local components
import Layout from '../core/HOC/Layout';
import SearchBar from '../core/components/Movie/List/SearchBar';
import MovieTable from '../core/components/Movie/List/MovieTable';

// import MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home: NextPageWithLayout = () => {
  const tenPhimRef = useRef<HTMLInputElement | null>(null);
  const fromDateRef = useRef<Moment | null>(null);
  const toDateRef = useRef<Moment | null>(null);

  const { data: moviePagi } = useSWR('movieList', () => {
    const tenPhim = tenPhimRef.current?.value ?? '';
    return movieServ.getMoviePagi(
      tenPhim,
      fromDateRef.current ?? undefined,
      toDateRef.current ?? undefined
    );
  });

  return (
    <Box component="div">
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mx: '1rem',
          mb: '1rem',
        }}
      >
        <Typography component="h1" fontSize="2rem" fontWeight="bold">
          Movie List
        </Typography>
        <Button variant="contained">Create movie</Button>
      </Box>
      <SearchBar
        tenPhimRef={tenPhimRef}
        fromDateRef={fromDateRef}
        toDateRef={toDateRef}
      />
      <MovieTable />
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
