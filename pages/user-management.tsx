import { ReactElement, useState, useMemo } from 'react';
import { NextPageWithLayout } from './_app';

// import local library
import useSWR from 'swr';

// import local services
import userServ from 'core/services/userServ';

// import local constants
import { defaultFilterInfo } from 'core/constants/default.const';

// import local components
import Layout from '../core/HOC/Layout';
import UserListTable from '../core/components/User/UserListTable';
import UserFilter from '../core/components/User/UserFilter';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const UserManagement: NextPageWithLayout = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterInfo, setFilterInfo] = useState(defaultFilterInfo);

  const handleClickCreateUser = () => {};

  const { data: userList } = useSWR(
    ['user-list', filterInfo.hoTen],
    ([url, hoTen]) => userServ.getUserList(hoTen)
  );

  const filteredUserList = useMemo(() => {
    const isCompareLoaiNguoiDung = filterInfo.loaiNguoiDung ? true : false;
    return userList?.filter((user) => {
      return user.taiKhoan.toString().includes(filterInfo.taiKhoan) &&
        user.hoTen.includes(filterInfo.hoTen) &&
        user.email.includes(filterInfo.email) &&
        user.soDT.includes(filterInfo.soDT) &&
        isCompareLoaiNguoiDung
        ? user.loaiNguoiDung === filterInfo.loaiNguoiDung
        : true;
    });
  }, [userList, filterInfo]);

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      {/* USER LIST Content (Title and Table) */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
        <UserListTable userList={filteredUserList} />
      </Box>

      {/* USER LIST Filter Drawer */}
      <Box sx={{ flexShrink: 0 }}>
        <UserFilter
          open={filterOpen}
          setOpen={setFilterOpen}
          setFilterInfo={setFilterInfo}
        />
      </Box>
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
