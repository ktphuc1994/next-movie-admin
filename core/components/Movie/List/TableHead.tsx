import { useState, MouseEvent } from 'react';

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
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const FilterButton = ({
  id,
  handleClick,
}: {
  id: string | undefined;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) => (
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
}: InterfaceEnhancedTableHead<T>) => {
  // FILTER setting and handling
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const filterOpen = Boolean(anchorEl);
  const filterId = filterOpen ? 'head-cell-filter-popover' : undefined;
  const handleFilterClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };
  const handleFilter = () => {};

  // Event handler
  const createSortHandler =
    (property: keyof T) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <>
      <Popover
        id={filterId}
        open={filterOpen}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
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
                <FilterButton id={filterId} handleClick={handleFilterClick} />
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
                <FilterButton id={filterId} handleClick={handleFilterClick} />
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
