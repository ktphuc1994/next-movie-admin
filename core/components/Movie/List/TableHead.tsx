// import types and interfaces
import { InterfaceEnhancedTableHead } from 'core/interface/components/table.interface';

// import MUI components
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import visuallyHidden from '@mui/utils/visuallyHidden';

const EnhancedTableHead = <T,>({
  headCells,
  order,
  orderBy,
  onRequestSort,
}: InterfaceEnhancedTableHead<T>) => {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <TableRow sx={{ backgroundColor: 'lightgray' }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string | number}
            align={headCell.cellAlign}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontSize: '1rem' }}
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
  );
};

export default EnhancedTableHead;
