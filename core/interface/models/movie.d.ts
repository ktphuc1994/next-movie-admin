export interface InterfaceMovie {
  maPhim: number;
  tenPhim: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface InterfaceMoviePagi {
  currentPage: number;
  items: InterfaceMovie[];
  itemsOnThisPage: number;
  totalItems: number;
  totalPages: number;
}
