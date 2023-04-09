import { FormEvent, useRef } from 'react';

// import local library
import useSWR, { mutate } from 'swr';

// import local services
import userServ from 'core/services/userServ';

// import types and interfaces
import { InterfaceUser } from 'core/interface/models/user';
import { InterfaceUserFilterContentComponents } from 'core/interface/components/userList.interface';

// import MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const UserFilterContent = ({
  setOpen,
  setFilterInfo,
}: InterfaceUserFilterContentComponents) => {
  const hoTenRef = useRef<HTMLInputElement | null>(null);

  const handleResetHoTen = () => {
    if (hoTenRef.current) {
      hoTenRef.current.value = '';
    }
  };

  const handleFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const filteredData = Object.fromEntries(formData) as Record<
      keyof InterfaceUser,
      string
    >;
    setFilterInfo(filteredData);
    if (setOpen) setOpen(false);
    mutate(['user-list', filteredData.hoTen]);
  };

  const { data: loaiNguoiDungList } = useSWR(
    'loai-nguoi-dung',
    userServ.getUserRoles
  );

  return (
    <Box sx={{ px: 1, py: 2 }}>
      <Box component="form" onSubmit={handleFilter}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            size="small"
            margin="none"
            id="taiKhoanFilter"
            label="Tài khoản"
            name="taiKhoan"
            type="number"
            defaultValue=""
          />
          <TextField
            size="small"
            fullWidth
            margin="none"
            id="hoTenFilter"
            label="Họ Tên"
            name="hoTen"
            type="text"
            defaultValue=""
            inputRef={hoTenRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="hoTen-reset"
                    onClick={handleResetHoTen}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            size="small"
            margin="none"
            id="emailFilter"
            label="Email"
            name="email"
            type="text"
            defaultValue=""
          />
          <TextField
            fullWidth
            size="small"
            margin="none"
            id="soDtFilter"
            label="Số điện thoại"
            name="soDT"
            type="number"
            defaultValue=""
          />
          <FormControl fullWidth size="small">
            <InputLabel id="select-loai-nguoi-dung-filter">
              Loại người dùng
            </InputLabel>
            <Select
              name="loaiNguoiDung"
              labelId="select-loai-nguoi-dung-filter"
              id="loaiNguoiDungFiler"
              label="Loại người dùng"
              defaultValue=""
            >
              <MenuItem value="">
                <em>--ALL--</em>
              </MenuItem>
              {loaiNguoiDungList
                ? loaiNguoiDungList.map((loaiNguoiDung) => (
                    <MenuItem key={loaiNguoiDung} value={loaiNguoiDung}>
                      {loaiNguoiDung}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <Stack spacing={1} direction="row">
            <Button type="submit" variant="contained" fullWidth>
              Filter
            </Button>
            <Button type="reset" variant="outlined" fullWidth>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserFilterContent;
