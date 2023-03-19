import { InterfaceMovie } from './movie';
import { InterfaceHeThongRap } from './theater';

export interface InterfaceLichChieu {
  maLichChieu: number;
  maRap: number;
  ngayGioChieu: string;
  tenRap: string;
}

export interface InterfaceMovieSchedule extends InterfaceMovie {
  heThongRap: InterfaceHeThongRap[];
}

export interface InterfaceScheduleTableHead {
  maLichChieu: number;
  tenHeThongRap: string;
  tenCumRap: string;
  tenRap: string;
  ngayGioChieu: string;
}

export interface InterfaceFlattenSchedule extends InterfaceScheduleTableHead {
  maHeThongRap: string;
  maCumRap: string;
  maRap: number;
}
