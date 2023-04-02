import { ChangeEvent, useState, useRef } from 'react';
import { useRouter } from 'next/router';

// import local library
import useSWR, { mutate } from 'swr';
import moment from 'moment';
import { toast } from 'react-toastify';

// import local hooks
import { useCommonContext } from 'core/context/CommonContext';

// import local services
import movieServ from 'core/services/movieServ';

// import interface and type
import { AxiosError } from 'axios';
import { AxiosErrorData, Order } from 'core/interface/common/index.interface';
import {
  InterfaceMovie,
  InterfaceMovieUpdate,
} from 'core/interface/models/movie';
import { InterfaceMovieTableComponents } from 'core/interface/components/movieList.interface';
import { InterfaceCommonContext } from 'core/context/interface/common.interface';

// import local components
import EnhancedTableHead from './TableHead';
import ConfirmModal from '../../Modal/ConfirmModal';
import TableLoading from '../../Spinner/TableLoading';

// import local utils
import { axiosErrorHandling, getComparator } from 'core/utilities';

// import local constants
import { movieListHeadCells } from 'core/constants/default.const';

// import MUI components
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const MovieTable = ({
  tenPhimRef,
  fromDateRef,
  toDateRef,
  setMovieFormOpen,
  movieDetailRef,
}: InterfaceMovieTableComponents) => {
  const router = useRouter();
  const { setMoviePath } = useCommonContext() as InterfaceCommonContext;
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof InterfaceMovie>('ngayKhoiChieu');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const phimRef = useRef<{ maPhim: number; tenPhim: string }>({
    maPhim: 0,
    tenPhim: '',
  });

  const { data: moviePagi, isValidating } = useSWR('moviePagi', () => {
    const tenPhim = tenPhimRef.current?.value ?? '';
    return movieServ.getMoviePagi(
      tenPhim,
      fromDateRef.current ?? undefined,
      toDateRef.current ?? undefined
    );
  });
  if (!moviePagi)
    return (
      <Box component="div" sx={{ flexGrow: 1, position: 'relative' }}>
        <TableLoading />
      </Box>
    );

  const movieList = moviePagi.items;

  // TABLE CONTEXT event handlers
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof InterfaceMovie
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleMovieEditClick = (movieInfo: InterfaceMovie) => () => {
    // console.log(movieInfo);
    movieDetailRef.current = movieInfo;
    setMovieFormOpen(true);
  };

  const handleDeleteClick = (maPhim: number, tenPhim: string) => () => {
    phimRef.current = { maPhim, tenPhim };
    setConfirmOpen(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // MODAL event handler
  const handleCloseConfirm = () => {
    setConfirmOpen(false);
  };

  // MOVIE API event handlers
  const handleTenPhimClick = (maPhim: number | undefined) => () => {
    if (!maPhim) return;
    setMoviePath(`/movie/${maPhim}`);
    router.push(`/movie/${maPhim}`);
  };

  const handleMovieUpdate = (updateInfo: InterfaceMovieUpdate) => {
    movieServ
      .updateMovie(updateInfo)
      .then(() => {
        mutate('moviePagi');
        toast.success('Cập nhật thành công');
      })
      .catch(axiosErrorHandling);
  };
  const handleChangeTinhTrang =
    (maPhim: number | undefined) => (e: SelectChangeEvent) => {
      // console.log(e.target);
      if (!maPhim) return;
      const dangChieu = e.target.value === 'true' ? true : false;
      const sapChieu = !dangChieu;
      handleMovieUpdate({ maPhim, dangChieu, sapChieu });
    };
  const handleCheckHot =
    (maPhim: number | undefined) => (e: ChangeEvent<HTMLInputElement>) => {
      // console.log(e.target);
      if (!maPhim) return;
      const hot = e.target.checked;
      handleMovieUpdate({ maPhim, hot });
    };

  const handleDeleteConfirm = () => {
    movieServ
      .deleteMovie(phimRef.current.maPhim)
      .then(() => {
        mutate('moviePagi');
        toast.success('Xóa phim thành công');
      })
      .catch((err: AxiosError<AxiosErrorData>) => {
        const mess = err.response?.data.message;
        if (mess) {
          toast.error(mess);
        } else {
          toast.error(err.message);
        }
      })
      .finally(() => {
        setConfirmOpen(false);
      });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movieList.length) : 0;

  return (
    <Box sx={{ width: '100%', flexGrow: 1, position: 'relative' }}>
      <TableContainer
        sx={{
          // overflowX: 'inherit',
          position: 'relative',
        }}
      >
        {isValidating ? <TableLoading bgColor="rgba(0, 0, 0, 0.15)" /> : null}
        <Table
          aria-label="sticky table"
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          sx={{ minWidth: 750 }}
        >
          <EnhancedTableHead<InterfaceMovie>
            headCells={movieListHeadCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {movieList
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.maPhim}
                  >
                    <TableCell component="th" scope="row">
                      {row.maPhim}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={handleTenPhimClick(row.maPhim)}
                      sx={{
                        cursor: 'pointer',
                        div: {
                          fontWeight: 600,
                          transition: 'all 0.3s',
                        },
                        '&:hover': {
                          div: {
                            transform: 'scale(1.05)',
                          },
                        },
                      }}
                    >
                      <div>{row.tenPhim}</div>
                    </TableCell>
                    <TableCell align="right">
                      {row.ngayKhoiChieu
                        ? moment(row.ngayKhoiChieu).format('DD/MM/YYYY')
                        : 'TBA'}
                    </TableCell>
                    <TableCell align="right">
                      <FormControl size="small">
                        <Select
                          name="dangChieu"
                          value={row.dangChieu.toString()}
                          onChange={handleChangeTinhTrang(row.maPhim)}
                        >
                          <MenuItem value="true">Đang chiếu</MenuItem>
                          <MenuItem value="false">Sắp chiếu</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        name="hot"
                        color="primary"
                        checked={row.hot ?? false}
                        onChange={handleCheckHot(row.maPhim)}
                      />
                    </TableCell>
                    <TableCell align="right">{row.danhGia}</TableCell>
                    <TableCell align="center">
                      <Box
                        component="div"
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <IconButton
                          color="editYellow"
                          onClick={handleMovieEditClick(row)}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={handleDeleteClick(row.maPhim!, row.tenPhim)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 53 : 73) * emptyRows,
                }}
              >
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={movieList.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Số dòng trên trang"
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Padding mỏng"
      />
      <ConfirmModal
        open={confirmOpen}
        handleClose={handleCloseConfirm}
        handleConfirm={handleDeleteConfirm}
        confirmContent={
          <span>
            Bạn có chắc chắn muốn xóa phim{' '}
            <span style={{ fontWeight: 600 }}>{phimRef.current.tenPhim}</span>?
          </span>
        }
      />
    </Box>
  );
};

export default MovieTable;
