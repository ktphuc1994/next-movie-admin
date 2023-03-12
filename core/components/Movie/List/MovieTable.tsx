import { useState } from 'react';

// import interface and type
import {
  InterfaceMovie,
  InterfaceMoviePagi,
} from '../../../interface/models/movie';

// import MUI components
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import visuallyHidden from '@mui/utils/visuallyHidden';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// import local library
import { useSWRConfig } from 'swr';
import moment from 'moment';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | boolean },
  b: { [key in Key]: number | string | boolean }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof InterfaceMovie;
  label: string;
  cellAlign: 'center' | 'left' | 'right' | 'inherit' | 'justify';
}
const headCells: readonly HeadCell[] = [
  { id: 'maPhim', cellAlign: 'left', disablePadding: true, label: 'Mã phim' },
  {
    id: 'tenPhim',
    cellAlign: 'left',
    disablePadding: false,
    label: 'Tên phim',
  },
  {
    id: 'ngayKhoiChieu',
    cellAlign: 'right',
    disablePadding: false,
    label: 'Ngày khởi chiếu',
  },
  {
    id: 'dangChieu',
    cellAlign: 'right',
    disablePadding: false,
    label: 'Tình trạng',
  },
  { id: 'hot', cellAlign: 'right', disablePadding: false, label: 'Hot' },
  {
    id: 'danhGia',
    cellAlign: 'right',
    disablePadding: false,
    label: 'Đánh giá',
  },
];

interface EnhancedTableProps {
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof InterfaceMovie
  ) => void;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof InterfaceMovie) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.cellAlign}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key="action" align="center" sortDirection={false}>
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

function TableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Movie List
      </Typography>
    </Toolbar>
  );
}

const MovieTable = () => {
  const { cache } = useSWRConfig();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof InterfaceMovie>('ngayKhoiChieu');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const moviePagiCache = cache.get('movieList')?.data as
    | InterfaceMoviePagi
    | undefined;
  if (!moviePagiCache) return <div>...Loading</div>;
  const movieList = moviePagiCache.items;

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

  const handleSelectStatus = (e: SelectChangeEvent) => {};

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movieList.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {movieList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.maPhim}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.maPhim}
                      </TableCell>
                      <TableCell align="left">{row.tenPhim}</TableCell>
                      <TableCell align="right">
                        {moment(row.ngayKhoiChieu).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="right">
                        <FormControl size="small">
                          <Select
                            value={row.dangChieu.toString()}
                            onChange={handleSelectStatus}
                          >
                            <MenuItem value="true">Đang chiếu</MenuItem>
                            <MenuItem value="false">Sắp chiếu</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox color="primary" checked={row.hot} />
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
                          <BorderColorIcon
                            sx={{ mr: '0.5rem' }}
                            color="warning"
                          />
                          <DeleteOutlineIcon color="error" />
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
                  <TableCell colSpan={6} />
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
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default MovieTable;
