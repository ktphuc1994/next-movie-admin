import { InterfaceMovie } from './movie';
import { InterfaceLichChieu } from './schedule';

export interface InterfaceCumRap {
  diaChi: string;
  maCumRap: string;
  tenCumRap: string;
  lichChieuPhim: InterfaceLichChieu[];
}

export interface InterfaceHeThongRap {
  logo: string;
  maHeThongRap: string;
  tenHeThongRap: string;
  cumRap: InterfaceCumRap[];
}
