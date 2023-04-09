import { memo, useState, useEffect } from 'react';

// import local library
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';

// import types and interfaces
import { InterfaceUserListTableComponents } from 'core/interface/components/userList.interface';
import { InterfaceUser } from 'core/interface/models/user';

// import local components
import TableLoading from '../Spinner/TableLoading';

// import MUI components
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ReorderIcon from '@mui/icons-material/Reorder';

const UserListTable = memo(({ userList }: InterfaceUserListTableComponents) => {
  const [listUser, setListUser] = useState<InterfaceUser[] | undefined>(
    undefined
  );

  useEffect(() => {
    setListUser(userList);
  }, [userList]);

  if (!listUser)
    return (
      <Box component="div" sx={{ flexGrow: 1, position: 'relative' }}>
        <TableLoading />
      </Box>
    );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const temp = [...listUser];
    const [movedItem] = temp.splice(result.source.index, 1);
    temp.splice(result.destination.index, 0, movedItem);
    setListUser(temp);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, tableLayout: 'auto' }}
        aria-label="user-list-table"
      >
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell align="left">&nbsp;</TableCell>
            <TableCell>Tài khoản</TableCell>
            <TableCell align="center">Loại người dùng</TableCell>
            <TableCell>Họ tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Số điện thoại</TableCell>
            <TableCell align="center">Cài đặt</TableCell>
          </TableRow>
        </TableHead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="table-users" direction="vertical">
            {(providedDrop) => (
              <TableBody
                {...providedDrop.droppableProps}
                ref={providedDrop.innerRef}
              >
                {listUser.map((row, index) => (
                  <Draggable
                    key={'user' + row.taiKhoan.toString()}
                    draggableId={'u-' + row.taiKhoan.toString()}
                    index={index}
                  >
                    {(providedDrag, snapshot) => (
                      <TableRow
                        ref={providedDrag.innerRef}
                        {...providedDrag.draggableProps}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          background: snapshot.isDragging
                            ? 'rgba(245,245,245, 0.75)'
                            : 'none',
                          display: snapshot.isDragging ? 'table' : 'table-row',
                        }}
                      >
                        <TableCell align="left">
                          <div {...providedDrag.dragHandleProps}>
                            <ReorderIcon />
                          </div>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.taiKhoan}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={row.loaiNguoiDung}
                            variant="outlined"
                            color={
                              row.loaiNguoiDung === 'ADMIN'
                                ? 'error'
                                : 'primary'
                            }
                          />
                        </TableCell>
                        <TableCell>{row.hoTen}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell align="right">{row.soDT}</TableCell>
                        <TableCell align="center">
                          <IconButton color="brightRed">
                            <SettingsSuggestIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {providedDrop.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </TableContainer>
  );
});

export default UserListTable;
