import { ReactElement, useRef, useState } from 'react';
import { NextPageWithLayout } from './_app';

// import types and interfaces
import { Moment } from 'moment';
import { InterfaceMovie } from '../core/interface/models/movie';

// import local components
import Layout from '../core/HOC/Layout';
import SearchBar from '../core/components/Movie/List/SearchBar';
import MovieTable from '../core/components/Movie/List/MovieTable';
import MovieForm from '../core/components/Movie/Form';

// import local constants
import { defaultMovieDetail } from '../core/constants/default.const';

// import MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home: NextPageWithLayout = () => {
  const tenPhimRef = useRef<HTMLInputElement | null>(null);
  const fromDateRef = useRef<Moment | null>(null);
  const toDateRef = useRef<Moment | null>(null);
  const [movieFormOpen, setMovieFormOpen] = useState<boolean>(false);
  const movieDetailRef = useRef<InterfaceMovie>(defaultMovieDetail);

  return (
    <Box
      component="div"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mx: '1rem',
          mb: '1rem',
          flexShrink: 0,
        }}
      >
        <Typography component="h1" fontSize="2rem" fontWeight="bold">
          Danh sách phim
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            movieDetailRef.current = defaultMovieDetail;
            setMovieFormOpen(true);
          }}
        >
          Thêm phim
        </Button>
      </Box>
      <SearchBar
        tenPhimRef={tenPhimRef}
        fromDateRef={fromDateRef}
        toDateRef={toDateRef}
      />
      <MovieTable
        tenPhimRef={tenPhimRef}
        fromDateRef={fromDateRef}
        toDateRef={toDateRef}
        setMovieFormOpen={setMovieFormOpen}
        movieDetailRef={movieDetailRef}
      />
      <MovieForm
        movieFormOpen={movieFormOpen}
        setMovieFormOpen={setMovieFormOpen}
        movieDetail={movieDetailRef.current}
      />
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
