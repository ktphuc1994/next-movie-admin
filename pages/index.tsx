import { ReactElement, useRef, useState } from 'react';
import { NextPageWithLayout } from './_app';

// import types and interfaces
import { Moment } from 'moment';

// import local components
import Layout from '../core/HOC/Layout';
import SearchBar from '../core/components/Movie/List/SearchBar';
import MovieTable from '../core/components/Movie/List/MovieTable';
import MovieCreate from '../core/components/Movie/Form';

// import MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home: NextPageWithLayout = () => {
  const tenPhimRef = useRef<HTMLInputElement | null>(null);
  const fromDateRef = useRef<Moment | null>(null);
  const toDateRef = useRef<Moment | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
        <Button
          variant="contained"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Create movie
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
        setDialogOpen={setDialogOpen}
      />
      <MovieCreate dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
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
