import { InterfaceMoviePagi } from './movie';

export interface InterfaceLogin {
  email: string;
  matKhau: string;
}

export interface InterfaceUser {
  taiKhoan: number;
  email: string;
  hoTen: string;
  soDT: string;
  loaiNguoiDung: string;
}

export interface InterfaceUserInfo extends InterfaceUser {
  iat: number;
  exp: number;
}

export interface InterfaceUserPagi extends Omit<InterfaceMoviePagi, 'items'> {
  items: InterfaceUser[];
}
