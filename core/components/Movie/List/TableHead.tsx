import { useState, useRef, MouseEvent } from 'react';

// import types and interfaces
import { InterfaceEnhancedTableHead } from 'core/interface/components/table.interface';

// import MUI components
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import visuallyHidden from '@mui/utils/visuallyHidden';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface InterfaceHeadFilterButton<T> {
  id: string | undefined;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const FilterButton = <T,>({
  id,
  handleClick,
}: InterfaceHeadFilterButton<T>) => (
  <IconButton
    aria-label="head cell filter"
    aria-describedby={id}
    onClick={handleClick}
  >
    <FilterAltIcon fontSize="small" />
  </IconButton>
);

const EnhancedTableHead = <T,>({
  headCells,
  order,
  orderBy,
  onRequestSort,
  state,
  dispatch,
  setPage,
}: InterfaceEnhancedTableHead<T>) => {
  // FILTER setting and handling
  // console.log({ state });
  const filterRef = useRef<HTMLInputElement | null>(null);
  const [filterId, setFilterId] = useState<keyof T>(headCells[0].id);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const filterOpen = Boolean(anchorEl);
  const filterPopoverId = filterOpen ? 'head-cell-filter-popover' : undefined;

  const handleFilterClick =
    (id: keyof T) => (event: MouseEvent<HTMLButtonElement>) => {
      if (!state) return;
      setFilterId(id);
      setAnchorEl(event.currentTarget);
    };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };
  const handleFilter = () => {
    const value = filterRef.current?.value;
    if (value !== undefined && dispatch) {
      dispatch({ type: filterId, payload: value });
      setPage && setPage(0);
    }
  };

  // Event handler
  const createSortHandler =
    (property: keyof T) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <>
      <Popover
        id={filterPopoverId}
        open={filterOpen}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: '0.2rem' }}>
          <TextField
            size="small"
            margin="none"
            id="filterInput"
            name="filterInput"
            type="text"
            defaultValue={state && filterId ? state[filterId] : ''}
            inputRef={filterRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="header-filter"
                    onClick={handleFilter}
                    edge="end"
                  >
                    <FilterAltIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Popover>
      <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <TableRow sx={{ backgroundColor: 'lightgray' }}>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id as string | number}
              align={headCell.cellAlign}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ fontSize: '1rem' }}
            >
              {headCell.cellAlign === 'left' && headCell.filter ? (
                <FilterButton
                  id={filterPopoverId}
                  handleClick={handleFilterClick(headCell.id)}
                />
              ) : null}
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
              {headCell.cellAlign !== 'left' && headCell.filter ? (
                <FilterButton
                  id={filterPopoverId}
                  handleClick={handleFilterClick(headCell.id)}
                />
              ) : null}
            </TableCell>
          ))}
          <TableCell
            key="action"
            align="center"
            sortDirection={false}
            sx={{ fontSize: '1rem' }}
          >
            Action
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default EnhancedTableHead;
