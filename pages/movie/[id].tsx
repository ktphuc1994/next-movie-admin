import { ReactElement } from 'react';

// import next
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';

// import local library
import useSWR from 'swr';

// import local components
import Layout from '../../core/HOC/Layout';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import theaterServ from '../../core/services/theaterServ';

const MovieAndSchedule: NextPageWithLayout = () => {
  const router = useRouter();

  const maPhim = router.query.id as string;
  const { data: movieSchedule } = useSWR(
    'movie-schedule',
    theaterServ.getMovieSchedule(maPhim)
  );

  const heThongRap = movieSchedule?.heThongRap;
  console.log(heThongRap);

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
          Lịch chiếu phim
        </Typography>
        <Button variant="contained">Tạo lịch chiếu</Button>
      </Box>
    </Box>
  );
};

MovieAndSchedule.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Movies and Schedule" description="Schedule for each movie">
      {page}
    </Layout>
  );
};

export default MovieAndSchedule;
