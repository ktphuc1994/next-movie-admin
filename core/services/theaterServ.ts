import { AXIOS_GENERATOR } from './configUrl';

// import local constants
import { urlConst } from '../constants/url.const';

// import types and interfaces
import { InterfaceMovieSchedule } from '../interface/models/schedule';

const theaterServ = {
  getMovieSchedule:
    (maPhim: string) => async (): Promise<InterfaceMovieSchedule> => {
      const { data } = await AXIOS_GENERATOR(urlConst.theater).get(
        `/LayThongTinLichChieuPhim/${maPhim}`
      );
      return data.content;
    },
};

export default theaterServ;
