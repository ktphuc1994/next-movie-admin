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
