// import AXIOS
import { AXIOS_GENERATOR } from './configUrl';

// import local constants
import { commonConst } from '../constants/common.const';
import { urlConst } from '../constants/url.const';

// import local library
import { Moment } from 'moment';
import {
  InterfaceMovie,
  InterfaceMovieCreate,
  InterfaceMoviePagi,
  InterfaceMovieUpdate,
} from '../interface/models/movie';

const movieServ = {
  getMovieList:
    (tenPhim: string = '') =>
    async (): Promise<InterfaceMovie[]> => {
      const { data } = await AXIOS_GENERATOR(urlConst.movie).get(
        '/LayDanhSachPhim?tenPhim=' + tenPhim
      );
      return data.content;
    },
  getMoviePagi: async (
    tenPhim: string = '',
    fromDate: Moment = commonConst.defaultDate.start,
    toDate: Moment = commonConst.defaultDate.end
  ): Promise<InterfaceMoviePagi> => {
    const start = fromDate.format('YYYY-MM-DD');
    const end = toDate.format('YYYY-MM-DD');
    const url = `/LayDanhSachPhimPhanTrang?tenPhim=${tenPhim}&itemsPerPage=1000000&fromDate=${start}&toDate=${end}`;
    const { data } = await AXIOS_GENERATOR(urlConst.movie).get(url);
    return data.content;
  },
  createMovie: async (phimInfo: InterfaceMovieCreate) => {
    const { data } = await AXIOS_GENERATOR(urlConst.movie).post(
      '/ThemPhim',
      phimInfo
    );
    return data.content;
  },
  updateMovie: async (updateInfo: InterfaceMovieUpdate) => {
    const { data } = await AXIOS_GENERATOR(urlConst.movie).put(
      '/CapNhatPhim',
      updateInfo
    );
    return data.content;
  },
  deleteMovie: async (maPhim: number) => {
    const { data } = await AXIOS_GENERATOR(urlConst.movie).delete(
      `/XoaPhim/${maPhim}`
    );
    return data.content;
  },
};

export default movieServ;
