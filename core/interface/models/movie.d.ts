export interface InterfaceMovieCreate {
  tenPhim: string;
  trailer: string;
  hinhAnh?: string | null;
  moTa: string;
  danhGia?: number | null;
  hot?: boolean | null;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu?: string | null;
}

export interface InterfaceMovie extends InterfaceMovieCreate {
  maPhim?: number;
}

export interface InterfaceMovieUpdate extends Partial<InterfaceMovieCreate> {
  maPhim: number;
}

export interface InterfaceMoviePagi {
  currentPage: number;
  items: InterfaceMovie[];
  itemsOnThisPage: number;
  totalItems: number;
  totalPages: number;
}
