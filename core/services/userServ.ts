import { BASE_URL, urlConst } from '../constants/url.const';
import { AXIOS_GENERATOR } from './configUrl';

// import local interface
import { InterfaceLogin, InterfaceUser } from '../interface/models/user';

const userServ = {
  login: async (
    loginInfo: InterfaceLogin
  ): Promise<{ Authorization: string }> => {
    const { data } = await AXIOS_GENERATOR(BASE_URL).post('/login', loginInfo);
    return data.content;
  },
  getUserInfo: async (): Promise<InterfaceUser> => {
    const { data } = await AXIOS_GENERATOR(urlConst.user).get(
      '/ThongTinTaiKhoan'
    );
    return data.content;
  },
};

export default userServ;
