import { AXIOS_GENERATOR } from './configUrl';

// import local constants
import { urlConst } from '../constants/url.const';

// import types and interfaces
import { InterfaceMovieSchedule } from '../interface/models/schedule';
import {
  InterfaceCumRapSelect,
  InterfaceHeThongRapSelect,
} from '../interface/models/theater';

const theaterServ = {
  getMovieSchedule:
    (maPhim: string) => async (): Promise<InterfaceMovieSchedule> => {
      const { data } = await AXIOS_GENERATOR(urlConst.theater).get(
        `/LayThongTinLichChieuPhim/${maPhim}`
      );
      return data.content;
    },
  getHeThongRap: async (): Promise<InterfaceHeThongRapSelect[]> => {
    const { data } = await AXIOS_GENERATOR(urlConst.theater).get(
      '/LayThongTinHeThongRap'
    );
    return data.content;
  },
  getCumRap:
    (maHeThongRap: string | undefined) =>
    async (): Promise<InterfaceCumRapSelect[] | undefined> => {
      if (!maHeThongRap) return undefined;
      const { data } = await AXIOS_GENERATOR(urlConst.theater).get(
        '/LayThongTinCumRap/' + maHeThongRap
      );
      return data.content;
    },
};

export default theaterServ;
