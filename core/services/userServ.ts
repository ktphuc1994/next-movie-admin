import { BASE_URL, urlConst } from '../constants/url.const';
import { AXIOS_GENERATOR } from './configUrl';

// import local interface
import {
  InterfaceLogin,
  InterfaceUser,
  InterfaceUserInfo,
  InterfaceUserPagi,
} from '../interface/models/user';

const userServ = {
  login: async (
    loginInfo: InterfaceLogin
  ): Promise<{ Authorization: string }> => {
    const { data } = await AXIOS_GENERATOR(BASE_URL).post('/login', loginInfo);
    return data.content;
  },
  getUserRoles: async (): Promise<string[]> => {
    const { data } = await AXIOS_GENERATOR(urlConst.user).get(
      '/LayDanhSachLoaiNguoiDung'
    );
    return data.content;
  },
  getUserInfo: async (): Promise<InterfaceUserInfo> => {
    const { data } = await AXIOS_GENERATOR(urlConst.user).get(
      '/ThongTinTaiKhoan'
    );
    return data.content;
  },
  getUserPagi: async (
    hoTen: string = '',
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<InterfaceUserPagi> => {
    const { data } = await AXIOS_GENERATOR(urlConst.user).get(
      `/TimKiemNguoiDungPhanTrang?tuKhoa=${hoTen}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return data.content;
  },
  getUserList: async (hoTen: string = ''): Promise<InterfaceUser[]> => {
    const { data } = await AXIOS_GENERATOR(urlConst.user).get(
      `/TimKiemNguoiDung?tuKhoa=${hoTen}`
    );
    return data.content;
  },
};

export default userServ;
