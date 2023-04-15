import React, { FormEvent } from 'react';

// import local library
import useSWR from 'swr';

// import local services
import userServ from 'core/services/userServ';

// import types and interfaces
import { InterfaceUserFormContentComponents } from 'core/interface/components/userList.interface';
import {
  InterfaceCreateUser,
  InterfaceUpdateUser,
} from 'core/interface/models/user';

// import local constants
import { validateRegEx } from 'core/constants/default.const';

// import local components
import MatKhauField from '../Utils/ValidateTextField/MatKhauField';

// import MUI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const UserFormContent = ({
  defaultUser,
  handleOK,
  setButtonLoading,
}: InterfaceUserFormContentComponents) => {
  const isUpdate = defaultUser.taiKhoan ? true : false;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true);
    const formData = new FormData(e.currentTarget);

    const matKhau = formData.get('matKhau') as string | null;
    const isMatKhauValid = matKhau
      ? validateRegEx.password.regex.test(matKhau)
      : true;
    if (!isMatKhauValid) {
      setButtonLoading(false);
      return;
    }
    if (!matKhau) {
      formData.delete('matKhau');
    }

    const data = Object.fromEntries(formData.entries());
    const userInfo = {
      ...data,
      taiKhoan: defaultUser.taiKhoan,
    } as InterfaceCreateUser & InterfaceUpdateUser;
    const method = isUpdate ? 'updateUser' : 'createUser';

    await handleOK(method, userInfo);
    setButtonLoading(false);
  };

  const { data: loaiNguoiDungList } = useSWR(
    'loai-nguoi-dung',
    userServ.getUserRoles
  );

  return (
    <Box component="div" sx={{ p: { xs: '1rem', sm: '1.5rem' } }}>
      <Toolbar />
      {isUpdate ? (
        <Typography component="p" sx={{ mb: '1.5rem' }}>
          Tài khoản:{' '}
          <Typography
            component="span"
            sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            {defaultUser.taiKhoan}
          </Typography>
        </Typography>
      ) : null}
      <Box component="form" id="user-form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="hoTen"
            required={isUpdate ? false : true}
            fullWidth
            id="hoTen-user-form"
            label="Họ tên"
            type="text"
            defaultValue={defaultUser.hoTen}
          />
          <TextField
            name="email"
            required={isUpdate ? false : true}
            fullWidth
            id="email-user-form"
            label="Email"
            type="email"
            autoComplete="off"
            defaultValue={defaultUser.email}
          />
          <MatKhauField required={!isUpdate} />
          <TextField
            name="soDT"
            required={isUpdate ? false : true}
            fullWidth
            id="soDT-user-form"
            label="Số điện thoại"
            type="number"
            defaultValue={defaultUser.soDT}
          />
          <FormControl fullWidth>
            <InputLabel id="select-loai-nguoi-dung-form">
              Loại người dùng
            </InputLabel>
            <Select
              name="loaiNguoiDung"
              labelId="select-loai-nguoi-dung-form"
              id="loaiNguoiDung-user-form"
              label="Loại người dùng"
              defaultValue={defaultUser.loaiNguoiDung}
            >
              {loaiNguoiDungList
                ? loaiNguoiDungList.map((loaiNguoiDung) => (
                    <MenuItem key={loaiNguoiDung} value={loaiNguoiDung}>
                      {loaiNguoiDung}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserFormContent;
