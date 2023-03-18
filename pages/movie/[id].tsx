import { ReactElement, useMemo } from 'react';

// import next
import { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';

// import local library
import useSWR from 'swr';

// import local services
import theaterServ from 'core/services/theaterServ';

// import types and interfaces
import { InterfaceFlattenSchedule } from 'core/interface/models/schedule';

// import local components
import Layout from 'core/HOC/Layout';
import ScheduleTable from 'core/components/Movie/Schedule/ScheduleTable';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const MovieAndSchedule: NextPageWithLayout = () => {
  const router = useRouter();
  const maPhim = router.query.id as string;
  const { data: movieSchedule } = useSWR(
    'movie-schedule',
    theaterServ.getMovieSchedule(maPhim)
  );

  const lichChieuList = useMemo(() => {
    if (!movieSchedule) return null;

    let lichChieuPhim: InterfaceFlattenSchedule[] = [];
    movieSchedule.heThongRap.forEach((heThong) => {
      heThong.cumRap.forEach((cr) => {
        cr.lichChieuPhim.forEach((lcp) => {
          lichChieuPhim.push({
            maLichChieu: lcp.maLichChieu,
            maHeThongRap: heThong.maHeThongRap,
            tenHeThongRap: heThong.tenHeThongRap,
            maCumRap: cr.maCumRap,
            tenCumRap: cr.tenCumRap,
            maRap: lcp.maRap,
            tenRap: lcp.tenRap,
            ngayGioChieu: lcp.ngayGioChieu,
          });
        });
      });
    });
    return lichChieuPhim;
  }, [movieSchedule]);

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
        <Typography component="h2" fontSize="2rem" fontWeight="bold">
          Lịch chiếu phim
        </Typography>
        <Typography component="h3" fontSize="1.5rem">
          {movieSchedule?.tenPhim}
        </Typography>
        <Button variant="contained">Tạo lịch chiếu</Button>
      </Box>
      <ScheduleTable lichChieuList={lichChieuList} />
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
