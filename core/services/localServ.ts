import { localConst } from '../constants/localStore.const';

const localServ = {
  setToken: (value: string) => {
    localStorage.setItem(localConst.AUTH_TOKEN, value);
  },
  getToken: () => {
    const token = localStorage.getItem(localConst.AUTH_TOKEN);
    if (token) return token;
    return null;
  },
  removeToken: () => {
    localStorage.removeItem(localConst.AUTH_TOKEN);
  },
};

export default localServ;
