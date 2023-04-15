import { memo, useRef, useState, useReducer, useMemo } from 'react';
import { useRouter } from 'next/router';

// import local library
import { mutate } from 'swr';
import moment from 'moment';
import { toast } from 'react-toastify';

// import local services
import bookingServ from 'core/services/bookingServ';

// import local utilities
import { axiosErrorHandling, getComparator } from 'core/utilities';
import {
  scheduleFilterReducer,
  scheduleFilterReducerGen2,
} from 'core/helpers/movie';

// import types and interfaces
import { Order } from 'core/interface/common/index.interface';
import {
  InterfaceFlattenSchedule,
  InterfaceScheduleTableHead,
} from 'core/interface/models/schedule';
import { InterfaceScheduleTableComponent } from 'core/interface/components/movieSchedule.interface';

// import local components
import EnhancedTableHead from '../List/TableHead';
import TableLoading from '../../Spinner/TableLoading';
import ConfirmModal from '../../Modal/ConfirmModal';

// import default values
import {
  defaultMovieScheduleFilter,
  movieScheduleHeadCells,
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
  ({
    lichChieuList,
    selectedScheduleRef,
    setFormOpen,
  }: InterfaceScheduleTableComponent) => {
    const router = useRouter();
    const maPhim = router.query.id as string;

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] =
      useState<keyof InterfaceScheduleTableHead>('tenHeThongRap');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dense, setDense] = useState(false);

    // FILTER schedule list
    const [filterState, dispatch] = useReducer(
      scheduleFilterReducerGen2<keyof InterfaceScheduleTableHead>(),
      defaultMovieScheduleFilter
    );
    const filterStateRegEx = useMemo<
      Record<keyof InterfaceScheduleTableHead, RegExp>
    >(
      () => ({
        maLichChieu: filterState.maLichChieu
          ? new RegExp(
              filterState.maLichChieu.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'),
              'i'
            )
          : /[\s\S]*/,
        tenHeThongRap: filterState.tenHeThongRap
          ? new RegExp(
              filterState.tenHeThongRap.replace(
                /([.?*+^$[\]\\(){}|-])/g,
                '\\$1'
              ),
              'i'
            )
          : /[\s\S]*/,
        tenCumRap: filterState.tenCumRap
          ? new RegExp(
              filterState.tenCumRap.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'),
              'i'
            )
          : /[\s\S]*/,
        tenRap: filterState.tenRap
          ? new RegExp(
              filterState.tenRap.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'),
              'i'
            )
          : /[\s\S]*/,
        ngayGioChieu: filterState.ngayGioChieu
          ? new RegExp(
              filterState.ngayGioChieu.replace(
                /([.?*+^$[\]\\(){}|-])/g,
                '\\$1'
              ),
              'i'
            )
          : /[\s\S]*/,
      }),
      [filterState]
    );

    const filterLichChieuList = useMemo(() => {
      if (!lichChieuList) return null;
      return lichChieuList
        .filter(
          (lichChieu) =>
            filterStateRegEx.maLichChieu.test(
              lichChieu.maLichChieu.toString()
            ) &&
            filterStateRegEx.tenHeThongRap.test(lichChieu.tenHeThongRap) &&
            filterStateRegEx.tenCumRap.test(lichChieu.tenCumRap) &&
            filterStateRegEx.tenRap.test(lichChieu.tenRap)
        )
        .sort(getComparator(order, orderBy));
    }, [lichChieuList, filterStateRegEx, order, orderBy]);

    if (!lichChieuList || !filterLichChieuList)
      return (
        <Box component="div" sx={{ flexGrow: 1, position: 'relative' }}>
          <TableLoading />
        </Box>
      );

    // FORM Control
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    // TABLE control
    const emptyRows =
      page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - filterLichChieuList.length)
        : 0;

    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof InterfaceScheduleTableHead
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleEditClick = (schedule: InterfaceFlattenSchedule) => () => {
      selectedScheduleRef.current = schedule;
      setFormOpen(true);
    };

    const handleDeleteClick =
      (scheduleInfo: InterfaceFlattenSchedule) => () => {
        selectedScheduleRef.current = scheduleInfo;
        setModalOpen(true);
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

    // SCHEDULE API Handling
    const handleDeleteSchedule = async () => {
      try {
        await bookingServ.deleteSchedule(
          selectedScheduleRef.current.maLichChieu
        );
        mutate(['movie-schedule', maPhim]);
        toast.success('Xóa lịch chiếu thành công!');
        setModalOpen(false);
      } catch (error) {
        axiosErrorHandling(error);
      }
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
              state={filterState}
              dispatch={dispatch}
              setPage={setPage}
            />
            <TableBody>
              {filterLichChieuList
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
                            onClick={handleEditClick(row)}
                          >
                            <BorderColorIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={handleDeleteClick(row)}
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
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={filterLichChieuList.length}
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
          open={modalOpen}
          handleClose={handleCloseModal}
          handleConfirm={handleDeleteSchedule}
          confirmContent={
            <span>
              Bạn có chắc chắn muốn xóa lịch chiếu{' '}
              <span style={{ fontWeight: 600 }}>
                {selectedScheduleRef.current.maLichChieu}
              </span>
              ?
            </span>
          }
        />
      </Box>
    );
  }
);

export default ScheduleTable;
