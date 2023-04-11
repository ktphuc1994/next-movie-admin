import { ReactElement, useState, useMemo } from 'react';
import { NextPageWithLayout } from './_app';

// import local library
import useSWR, { mutate } from 'swr';

// import local services
import userServ from 'core/services/userServ';

// import local constants
import {
  defaultUserFilterInfo,
  defaultUserFormInfo,
} from 'core/constants/default.const';

// import local utilities
import { axiosErrorHandling } from '../core/utilities';

// import local components
import Layout from '../core/HOC/Layout';
import UserListTable from '../core/components/User/UserListTable';
import UserFilter from '../core/components/User/UserFilter';
import UserForm from '../core/components/User/UserForm';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  InterfaceCreateUser,
  InterfaceUpdateUser,
  InterfaceUser,
} from '../core/interface/models/user';
import { toast } from 'react-toastify';

const UserManagement: NextPageWithLayout = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterInfo, setFilterInfo] = useState(defaultUserFilterInfo);
  const [formOpen, setFormOpen] = useState(false);
  const [userFormInfo, setUserFormInfo] = useState(defaultUserFormInfo);

  const handleClickCreateUser = () => {
    setFormOpen(true);
    setUserFormInfo(defaultUserFormInfo);
  };
  const handleClickUserSetting = (userInfo: InterfaceUser) => {
    setFormOpen(true);
    setUserFormInfo(userInfo);
  };
  const handleFormClose = () => {
    setFormOpen(false);
  };
  const handleFormOK = async (
    method: 'createUser' | 'updateUser',
    userInfo: InterfaceCreateUser & InterfaceUpdateUser
  ) => {
    try {
      await userServ[method](userInfo);
      const title = method === 'createUser' ? 'Tạo' : 'Cập nhật';
      toast.success(`${title} người dùng thành công`);
      mutate(['user-list', filterInfo.hoTen]);
      setFormOpen(false);
    } catch (err) {
      axiosErrorHandling(err);
    }
  };
  const handleFormDeleteUser = (taiKhoan: number) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        await userServ.deleteUser(taiKhoan);
        toast.success('Xóa người dùng thành công');
        mutate(['user-list', filterInfo.hoTen]);
        setFormOpen(false);
        resolve();
      } catch (err) {
        axiosErrorHandling(err);
        reject();
      }
    });

  const filterRegEx = useMemo(
    () => ({
      taiKhoan: filterInfo.taiKhoan
        ? new RegExp(
            filterInfo.taiKhoan.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'),
            'i'
          )
        : /[\s\S]*/,
      email: filterInfo.email
        ? new RegExp(
            filterInfo.email.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'),
            'i'
          )
        : /[\s\S]*/,
      soDT: filterInfo.soDT
        ? new RegExp(
            filterInfo.soDT.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'),
            'i'
          )
        : /[\s\S]*/,
      loaiNguoiDung: filterInfo.loaiNguoiDung,
    }),
    [filterInfo]
  );
  const { data: userList } = useSWR(
    ['user-list', filterInfo.hoTen],
    ([url, hoTen]) => userServ.getUserList(hoTen)
  );
  const filteredUserList = useMemo(() => {
    if (!userList) return undefined;
    return userList.filter((user) => {
      return (
        (filterRegEx.loaiNguoiDung
          ? user.loaiNguoiDung === filterInfo.loaiNguoiDung
          : true) &&
        filterRegEx.taiKhoan.test(user.taiKhoan.toString()) &&
        filterRegEx.email.test(user.email) &&
        filterRegEx.soDT.test(user.soDT)
      );
    });
  }, [userList, filterRegEx]);

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      {/* USER LIST Content (Title and Table) */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            mx: { xs: 1, md: 2 },
            mb: '1rem',
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'flex-start', md: 'space-between' },
              alignItems: { xs: 'stretch', md: 'center' },
            }}
          >
            <Typography component="h2" fontSize="1.8rem" fontWeight="bold">
              Quản lí người dùng
            </Typography>
            <Button variant="contained" onClick={handleClickCreateUser}>
              Thêm người dùng
            </Button>
          </Box>
          <Box
            component="div"
            sx={{
              mt: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              flexShrink: 0,
            }}
          >
            <IconButton
              color="primary"
              aria-label="filter-user"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <FilterAltIcon />
            </IconButton>
          </Box>
        </Box>
        <UserListTable
          userList={filteredUserList}
          handleClickSetting={handleClickUserSetting}
        />
      </Box>

      {/* USER LIST Filter Drawer */}
      <Box sx={{ flexShrink: 0 }}>
        <UserFilter
          open={filterOpen}
          setOpen={setFilterOpen}
          setFilterInfo={setFilterInfo}
        />
      </Box>

      {/* USER FORM for create and update */}
      <UserForm
        open={formOpen}
        handleClose={handleFormClose}
        handleOK={handleFormOK}
        handleDelete={handleFormDeleteUser}
        defaultUser={userFormInfo}
      />
    </Box>
  );
};

UserManagement.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="User Management" description="Manage all users">
      {page}
    </Layout>
  );
};

export default UserManagement;
