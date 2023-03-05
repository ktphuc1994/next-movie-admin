import axios from 'axios';
import localServ from './localServ';

export const AXIOS_GENERATOR = (URL: string) => {
  const config = {
    baseURL: URL,
    headers: {
      Authorization: 'Bearer ' + localServ.getToken(),
    },
  };
  return axios.create(config);
};
