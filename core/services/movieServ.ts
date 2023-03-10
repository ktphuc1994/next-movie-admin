// import AXIOS
import { AXIOS_GENERATOR } from './configUrl';

// import local constants
import { commonConst } from '../constants/common.const';
import { urlConst } from '../constants/url.const';

// import local library
import moment, { Moment } from 'moment';
import { InterfaceMoviePagi } from '../interface/models/movie';

const movieServ = {
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
};

export default movieServ;
