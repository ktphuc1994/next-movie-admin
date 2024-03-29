export const BASE_URL = 'http://api-nestjs-movie.khucthienphuc.name.vn/api';
export const urlConst = {
  user: BASE_URL + '/QuanLyNguoiDung',
  movie: BASE_URL + '/QuanLyPhim',
  theater: BASE_URL + '/QuanLyRap',
  booking: BASE_URL + '/QuanLyDatVe',
  uploadImage: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
};
