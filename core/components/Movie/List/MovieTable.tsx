import React from 'react';

import {
  alpha,
  Box,
  Checkbox,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import visuallyHidden from '@mui/utils/visuallyHidden';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

// import local library
import useSWR, { useSWRConfig } from 'swr';
import { InterfaceMovie } from '../../../interface/models/movie';

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
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeaderId extends InterfaceMovie {
  action: string;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof HeaderId;
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
    cellAlign: 'center',
    disablePadding: false,
    label: 'Tình trạng',
  },
  { id: 'hot', cellAlign: 'center', disablePadding: false, label: 'Hot' },
  {
    id: 'danhGia',
    cellAlign: 'right',
    disablePadding: false,
    label: 'Đánh giá',
  },
  { id: 'action', cellAlign: 'center', disablePadding: false, label: 'Action' },
];

interface EnhancedTableProps {
  order: Order;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof HeaderId
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    onSelectAllClick,
  } = props;
  const createSortHandler =
    (property: keyof HeaderId) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all movie',
            }}
          />
        </TableCell>
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
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

const MovieTable = () => {
  const { cache } = useSWRConfig();
  const moviePagiCache = cache.get('movieList')?.data;

  return <div>MovieTable</div>;
};

export default MovieTable;
