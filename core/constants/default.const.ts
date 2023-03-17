import { InterfaceMovie } from '../interface/models/movie';

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
