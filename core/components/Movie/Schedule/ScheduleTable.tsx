import { memo, useState, useReducer } from 'react';

// import Next

// import local library
import moment from 'moment';

// import local utilities
import { getComparator } from 'core/utilities';
import {
  scheduleFilterReducer,
  scheduleFilterReducerGen2,
} from 'core/helpers/movie';

// import types and interfaces
import { Order } from 'core/interface/common/index.interface';
import { InterfaceScheduleTableHead } from 'core/interface/models/schedule';
import { InterfaceScheduleTableComponent } from 'core/interface/components/movieSchedule.interface';

// import local components
import EnhancedTableHead from '../List/TableHead';
import TableLoading from '../../Spinner/TableLoading';

// import default values
import {
  defaultMovieScheduleFilter,
  movieScheduleHeadCells,
  TypeMovieScheduleFilter,
} from 'core/constants/default.const';

// import MUI components
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ScheduleTable = memo(
  ({ lichChieuList }: InterfaceScheduleTableComponent) => {
    const [state, dispatch] = useReducer(
      scheduleFilterReducerGen2<keyof TypeMovieScheduleFilter>(),
      defaultMovieScheduleFilter
    );
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] =
      useState<keyof InterfaceScheduleTableHead>('tenHeThongRap');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dense, setDense] = useState(false);

    if (!lichChieuList)
      return (
        <Box component="div" sx={{ flexGrow: 1, position: 'relative' }}>
          <TableLoading />
        </Box>
      );

    const emptyRows =
      page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - lichChieuList.length)
        : 0;

    // TABLE control
    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof InterfaceScheduleTableHead
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleEditClick = () => {};

    const handleDeleteClick = () => {};

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

    return (
      <Box sx={{ width: '100%', flexGrow: 1, position: 'relative' }}>
        <TableContainer
          sx={{
            // overflowX: 'inherit',
            position: 'relative',
          }}
        >
          <Table
            aria-label="sticky table"
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            sx={{ minWidth: 750 }}
          >
            <EnhancedTableHead<InterfaceScheduleTableHead>
              headCells={movieScheduleHeadCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              state={state}
              dispatch={dispatch}
            />
            <TableBody>
              {lichChieuList
                .filter(
                  (lichChieu) =>
                    lichChieu.tenHeThongRap.includes(state.tenHeThongRap) &&
                    lichChieu.tenCumRap.includes(state.tenCumRap) &&
                    lichChieu.tenRap.includes(state.tenRap)
                )
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.maLichChieu} hover tabIndex={-1}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 600 }}
                      >
                        {row.maLichChieu}
                      </TableCell>
                      <TableCell align="left">{row.tenHeThongRap}</TableCell>
                      <TableCell align="left">{row.tenCumRap}</TableCell>
                      <TableCell align="left">{row.tenRap}</TableCell>
                      <TableCell align="right">
                        {moment(row.ngayGioChieu).format('HH:mm DD/MM/YYYY')}
                      </TableCell>
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
                            onClick={handleEditClick}
                          >
                            <BorderColorIcon />
                          </IconButton>
                          <IconButton color="error" onClick={handleDeleteClick}>
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
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={lichChieuList.length}
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
      </Box>
    );
  }
);

export default ScheduleTable;
