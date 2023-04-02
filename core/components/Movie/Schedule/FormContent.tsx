import { useState, useRef, useMemo, FormEvent } from 'react';
import { useRouter } from 'next/router';

// import local library
import useSWR, { mutate } from 'swr';
import { toast } from 'react-toastify';

// import local services
import theaterServ from 'core/services/theaterServ';
import bookingServ from 'core/services/bookingServ';

// import types and interfaces
import { InterfaceFormContentComponent } from 'core/interface/components/movieSchedule.interface';
import {
  InterfaceCreateLichChieu,
  InterfaceUpdateLichChieu,
} from 'core/interface/models/schedule';
import moment, { Moment } from 'moment';

// import local utilities
import { axiosErrorHandling } from 'core/utilities';

// import MUI components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

const FormContent = ({
  selectedSchedule,
  setOpen,
  setLoading,
}: InterfaceFormContentComponent) => {
  const router = useRouter();
  const maPhimString = router.query.id as string;
  const isUpdate = Boolean(selectedSchedule.maLichChieu);

  // default setup
  const defaultHeThongRap = isUpdate
    ? {
        maHeThongRap: selectedSchedule.maHeThongRap,
        tenHeThongRap: selectedSchedule.tenHeThongRap,
        logo: '',
      }
    : null;
  const defaultCumRap = isUpdate
    ? {
        maCumRap: selectedSchedule.maCumRap,
        tenCumRap: selectedSchedule.tenCumRap,
      }
    : null;
  const defaultRap = isUpdate
    ? { maRap: selectedSchedule.maRap, tenRap: selectedSchedule.tenRap }
    : null;
  const defaultNgayGioChieu = isUpdate
    ? moment(selectedSchedule.ngayGioChieu)
    : null;

  // autocomplete control
  const [selectedHeThongRap, setHeThongRap] = useState(defaultHeThongRap);
  const [selectedCumRap, setCumRap] = useState(defaultCumRap);
  const [selectedRap, setRap] = useState(defaultRap);
  const ngayGioChieuRef = useRef<Moment | null>(defaultNgayGioChieu);

  const { data: heThongRapList, isValidating: isHeThongRapFetching } = useSWR(
    'he-thong-rap-form',
    theaterServ.getHeThongRap
  );
  const { data: cumRapList, isValidating: isCumRapFetching } = useSWR(
    ['cum-rap-form', selectedHeThongRap?.maHeThongRap],
    theaterServ.getCumRap(selectedHeThongRap?.maHeThongRap)
  );
  const rapList = useMemo(() => {
    if (!cumRapList || !selectedCumRap) return undefined;
    const newCumRap = cumRapList.find(
      (cumRap) => cumRap.maCumRap === selectedCumRap.maCumRap
    );
    return newCumRap?.rapPhim;
  }, [cumRapList, selectedCumRap]);

  // HANDLE Event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ngayGioChieu = ngayGioChieuRef.current ?? defaultNgayGioChieu;
    const maRap = selectedRap?.maRap;
    const maPhim = parseInt(maPhimString);
    if (!ngayGioChieu || !maRap) {
      toast.error('Xin vui lòng nhập đầy đủ thông tin.');
      return;
    }

    setLoading(true);
    const scheduleInfo = {
      maPhim,
      maRap,
      ngayGioChieu: ngayGioChieu.toISOString(),
    } as InterfaceCreateLichChieu & InterfaceUpdateLichChieu;
    if (isUpdate) {
      scheduleInfo.maLichChieu = selectedSchedule.maLichChieu;
    }

    const method = isUpdate ? 'updateSchedule' : 'createSchedule';
    try {
      await bookingServ[method](scheduleInfo);
      mutate(['movie-schedule', maPhimString]);
      toast.success(`${isUpdate ? 'Cập nhật' : 'Tạo'} lịch chiếu thành công.`);
      setOpen(false);
    } catch (err) {
      axiosErrorHandling(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      id="movie-schedule-form"
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <Stack spacing={2}>
        <Autocomplete
          id="he-thong-rap-form"
          loading={isHeThongRapFetching}
          options={heThongRapList ?? []}
          isOptionEqualToValue={(option, value) =>
            option.maHeThongRap === value.maHeThongRap
          }
          getOptionLabel={(option) => option.tenHeThongRap}
          value={selectedHeThongRap}
          onChange={(e, option) => {
            setHeThongRap(option);
            setCumRap(null);
            setRap(null);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Hệ Thống Rạp" required />
          )}
        />
        <Autocomplete
          id="cum-rap-form"
          loading={isCumRapFetching}
          options={cumRapList ?? []}
          getOptionLabel={(option) => option.tenCumRap}
          isOptionEqualToValue={(option, value) =>
            option.maCumRap === value.maCumRap
          }
          value={selectedCumRap}
          onChange={(e, option) => {
            setCumRap(option);
            setRap(null);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Cụm Rạp" required />
          )}
        />
        <Autocomplete
          id="rap-form"
          loading={isCumRapFetching}
          options={rapList ?? []}
          getOptionLabel={(option) => option.tenRap}
          isOptionEqualToValue={(option, value) => option.maRap === value.maRap}
          value={selectedRap}
          onChange={(e, option) => setRap(option)}
          renderInput={(params) => (
            <TextField {...params} label="Rạp" required />
          )}
        />
        <MobileDateTimePicker
          label="Ngày giờ chiếu"
          format="DD/MM/YYYY hh:mm A"
          defaultValue={defaultNgayGioChieu}
          slotProps={{
            textField: { fullWidth: true, required: true },
            actionBar: { actions: ['clear', 'accept'] },
          }}
          onChange={(newValue: Moment | null) => {
            ngayGioChieuRef.current = newValue;
          }}
        />
      </Stack>
    </Box>
  );
};

export default FormContent;
