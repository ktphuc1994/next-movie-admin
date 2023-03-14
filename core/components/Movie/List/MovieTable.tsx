import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

// import local library
import useSWR from 'swr';
import moment from 'moment';

// import local services
import movieServ from '../../../services/movieServ';

// import interface and type
import { Order } from 'core/interface/common/index.interface';
import { InterfaceMovie } from 'core/interface/models/movie';
import { InterfaceMovieTableComponents } from 'core/interface/components/index.interface';

// import local components
import EnhancedTableHead from './TableHead';

// import local utils
import { getComparator } from 'core/utilities';

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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

const MovieTable = ({
  tenPhimRef,
  fromDateRef,
  toDateRef,
  setDialogOpen,
}: InterfaceMovieTableComponents) => {
  const router = useRouter();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof InterfaceMovie>('ngayKhoiChieu');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: moviePagi } = useSWR('movieList', () => {
    const tenPhim = tenPhimRef.current?.value ?? '';
    return movieServ.getMoviePagi(
      tenPhim,
      fromDateRef.current ?? undefined,
      toDateRef.current ?? undefined
    );
  });

  if (!moviePagi) return <div>...Loading</div>;
  const movieList = moviePagi.items;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof InterfaceMovie
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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

  // Handle movie API
  const handleTenPhimClick = (maPhim: number) => () => {
    router.push(`/movie/${maPhim}`);
  };

  const handleSelectStatus = (e: SelectChangeEvent) => {
    console.log(e);
  };

  const handleCheckHot = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
  };

  const handleMovieEdit = () => {
    setDialogOpen(true);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movieList.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      {/* <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}> */}
      <TableContainer sx={{ overflowX: 'inherit' }}>
        <Table
          aria-label="sticky table"
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          sx={{ minWidth: 750 }}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {movieList
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.maPhim}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.maPhim}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={handleTenPhimClick(row.maPhim)}
                      sx={{
                        cursor: 'pointer',
                        div: {
                          transition: 'all 0.3s',
                        },
                        '&:hover': {
                          div: {
                            transform: 'scale(1.05)',
                            fontWeight: 600,
                          },
                        },
                      }}
                    >
                      <div>{row.tenPhim}</div>
                    </TableCell>
                    <TableCell align="right">
                      {moment(row.ngayKhoiChieu).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="right">
                      <FormControl size="small">
                        <Select
                          defaultValue={row.dangChieu.toString()}
                          onChange={handleSelectStatus}
                        >
                          <MenuItem value="true">Đang chiếu</MenuItem>
                          <MenuItem value="false">Sắp chiếu</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        color="primary"
                        defaultChecked={row.hot}
                        onChange={handleCheckHot}
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
                          onClick={handleMovieEdit}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton color="error">
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
                  height: (dense ? 33 : 53) * emptyRows,
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
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* </Paper> */}
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default MovieTable;
