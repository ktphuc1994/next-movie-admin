import { HeadCell } from '../interface/components/table.interface';
import { InterfaceMovie } from '../interface/models/movie';
import {
  InterfaceFlattenSchedule,
  InterfaceScheduleTableHead,
} from '../interface/models/schedule';
import { InterfaceUser } from '../interface/models/user';

export const imageDataType = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
];

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
    {
      id: 'maLichChieu',
      cellAlign: 'left',
      label: 'Mã lịch chiếu',
      filter: true,
    },
    {
      id: 'tenHeThongRap',
      cellAlign: 'left',
      label: 'Hệ thống rạp',
      filter: true,
    },
    { id: 'tenCumRap', cellAlign: 'left', label: 'Cụm rạp', filter: true },
    { id: 'tenRap', cellAlign: 'left', label: 'Tên rạp', filter: true },
    { id: 'ngayGioChieu', cellAlign: 'right', label: 'Ngày giờ chiếu' },
  ];

export const defaultMovieScheduleFilter: Record<
  keyof InterfaceScheduleTableHead,
  string
> = {
  maLichChieu: '',
  tenHeThongRap: '',
  tenCumRap: '',
  tenRap: '',
  ngayGioChieu: '',
};

export const defaultFlattenSchedule: InterfaceFlattenSchedule = {
  maLichChieu: 0,
  maHeThongRap: '',
  tenHeThongRap: '',
  maCumRap: '',
  tenCumRap: '',
  maRap: 0,
  tenRap: '',
  ngayGioChieu: '',
};

export const defaultUserFilterInfo: Record<keyof InterfaceUser, string> = {
  taiKhoan: '',
  email: '',
  hoTen: '',
  loaiNguoiDung: '',
  soDT: '',
};

export const defaultUserFormInfo: Partial<InterfaceUser> = {
  taiKhoan: undefined,
  email: undefined,
  hoTen: undefined,
  loaiNguoiDung: 'USER',
  soDT: undefined,
};

export const validateRegEx = {
  email: {
    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    message: 'Email không đúng định dạng',
  },
  password: {
    regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      'Mật khẩu phải từ 8 ký tự, ít nhất 1 chữ viết HOA, 1 chữ viết thường, 1 ký tự số và 1 ký tự đặc biệt',
  },
};
