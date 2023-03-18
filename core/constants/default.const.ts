import { HeadCell } from '../interface/components/table.interface';
import { InterfaceMovie } from '../interface/models/movie';
import { InterfaceScheduleTableHead } from '../interface/models/schedule';

export const danhGiaOption: string[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
];

export const defaultMovieDetail: InterfaceMovie = {
  maPhim: undefined,
  tenPhim: '',
  trailer: '',
  hinhAnh: undefined,
  moTa: '',
  ngayKhoiChieu: undefined,
  danhGia: undefined,
  hot: false,
  dangChieu: false,
  sapChieu: true,
};

export const movieListHeadCells: readonly HeadCell<InterfaceMovie>[] = [
  { id: 'maPhim', cellAlign: 'left', label: 'Mã phim' },
  {
    id: 'tenPhim',
    cellAlign: 'left',
    label: 'Tên phim',
  },
  {
    id: 'ngayKhoiChieu',
    cellAlign: 'right',
    label: 'Ngày khởi chiếu',
  },
  {
    id: 'dangChieu',
    cellAlign: 'right',
    label: 'Tình trạng',
  },
  { id: 'hot', cellAlign: 'right', label: 'Hot' },
  {
    id: 'danhGia',
    cellAlign: 'right',
    label: 'Đánh giá',
  },
];

export const movieScheduleHeadCells: readonly HeadCell<InterfaceScheduleTableHead>[] =
  [
    { id: 'maLichChieu', cellAlign: 'left', label: 'Mã lịch chiếu' },
    { id: 'maHeThongRap', cellAlign: 'left', label: 'Hệ thống rạp' },
    { id: 'maCumRap', cellAlign: 'left', label: 'Cụm rạp' },
    { id: 'maRap', cellAlign: 'left', label: 'Tên rạp' },
    { id: 'ngayGioChieu', cellAlign: 'right', label: 'Ngày giờ chiếu' },
  ];
