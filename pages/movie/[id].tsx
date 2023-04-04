import { ReactElement, useMemo, useState, useRef } from 'react';

// import next
import { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';

// import local library
import useSWR from 'swr';

// import local services
import theaterServ from 'core/services/theaterServ';

// import types and interfaces
import { InterfaceFlattenSchedule } from 'core/interface/models/schedule';

// import local constants
import { defaultFlattenSchedule } from 'core/constants/default.const';

// import local components
import Layout from 'core/HOC/Layout';
import ScheduleTable from 'core/components/Movie/Schedule/ScheduleTable';
import FormSchedule from 'core/components/Movie/Schedule/FormSchedule';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const MovieAndSchedule: NextPageWithLayout = () => {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const selectedScheduleRef = useRef<InterfaceFlattenSchedule>(
    defaultFlattenSchedule
  );

  // DATA fetching and filtering
  const maPhim = router.query.id as string;
  const { data: movieSchedule } = useSWR(
    ['movie-schedule', maPhim],
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

  // EVENT handling
  const handleClickTaoLichChieu = () => {
    selectedScheduleRef.current = defaultFlattenSchedule;
    setFormOpen(true);
  };

  return (
    <Box
      component="div"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box
        sx={{
          mx: '1rem',
          mb: '1rem',
          flexShrink: 0,
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography component="h2" fontSize="1.8rem" fontWeight="bold">
            {movieSchedule?.tenPhim}
          </Typography>
          <Button variant="contained" onClick={handleClickTaoLichChieu}>
            Tạo lịch chiếu
          </Button>
        </Box>
        <Typography component="h3" fontSize="1.5rem">
          Lịch chiếu phim
        </Typography>
      </Box>
      <ScheduleTable
        lichChieuList={lichChieuList}
        selectedScheduleRef={selectedScheduleRef}
        setFormOpen={setFormOpen}
      />
      <FormSchedule
        open={formOpen}
        setOpen={setFormOpen}
        selectedSchedule={selectedScheduleRef.current}
      />
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
