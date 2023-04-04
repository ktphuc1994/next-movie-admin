import { AXIOS_GENERATOR } from './configUrl';

// import local constants
import { urlConst } from '../constants/url.const';
import {
  InterfaceCreateLichChieu,
  InterfaceUpdateLichChieu,
} from '../interface/models/schedule';

const bookingServ = {
  createSchedule: async (createInfo: InterfaceCreateLichChieu) => {
    const { data } = await AXIOS_GENERATOR(urlConst.booking).post(
      '/TaoLichChieu',
      createInfo
    );
    return data;
  },
  updateSchedule: async (updateInfo: InterfaceUpdateLichChieu) => {
    const { data } = await AXIOS_GENERATOR(urlConst.booking).put(
      '/CapNhatLichChieu',
      updateInfo
    );
    return data;
  },
  deleteSchedule: async (maLichChieu: number) => {
    const { data } = await AXIOS_GENERATOR(urlConst.booking).delete(
      '/XoaLichChieu/' + maLichChieu
    );
    return data;
  },
};

export default bookingServ;
