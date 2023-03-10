import { useEffect, useState } from 'react';
import Head from 'next/head';

// import local library
import useSWR from 'swr';
import { toast } from 'react-toastify';

// import local type and interface
import { AxiosError } from 'axios';
import { InterfaceUser } from '../interface/models/user';
import { InterfaceLayout } from './interface/HOC.interface';

// import local service
import userServ from '../services/userServ';
import localServ from '../services/localServ';
import InnerSpinner from '../components/Spinner/InnerSpinner';

// import local components
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AuthModal from '../components/Modal/AuthModal';

// import local constants
import { commonConst } from '../constants/common.const';

// import MUI components
import { Box } from '@mui/material';

const Layout = ({
  children,
  title,
  description,
  icon = '/favicon.ico',
}: InterfaceLayout) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [errMess, setErrMess] = useState('');

  const { data: userInfo, error: userErr } = useSWR<
    InterfaceUser,
    AxiosError<{ error: string; message: string }>
  >('user', userServ.getUserInfo);

  useEffect(() => {
    if (userErr) {
      const token = localServ.getToken();
      if (!token) {
        setErrMess('Vui lòng đăng nhập để tiếp tục truy cập');
        setModalOpen(true);
        return;
      }

      if (userErr.response) {
        const rejectedErr = commonConst.loginRejectedError;
        if (
          rejectedErr.includes(userErr.response.status) &&
          userErr.response.data.message === 'Unauthorized. Token related'
        ) {
          setErrMess('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
          setModalOpen(true);
          return;
        }
        toast(userErr.response.data.message ?? userErr.message, {
          type: 'error',
        });
        return;
      }
    }

    if (userInfo && userInfo.loaiNguoiDung !== 'ADMIN') {
      setErrMess(
        'Người dùng không đủ quyền truy cập, vui lòng sử dụng tài khoản khác.'
      );
      setModalOpen(true);
    }
    // console.log('useEffect');
  }, [userInfo, userErr]);

  // console.log('userErr & userInfo: ', { userErr, userInfo });
  // console.log('Layout');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <link rel="icon" href={icon} />
      </Head>

      <Box component="main" sx={{ display: 'flex' }}>
        <Box component="div" sx={{ flexShrink: { md: 0 } }}>
          <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
        </Box>
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            px: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header sideOpen={sideOpen} setSideOpen={setSideOpen} />
          <Box component="div" sx={{ flexGrow: 1 }}>
            {userInfo !== undefined && userInfo.loaiNguoiDung === 'ADMIN' ? (
              children
            ) : (
              <InnerSpinner size="4rem" thickness={4} />
            )}
            {/* {children} */}
          </Box>
          <Footer />
        </Box>
        <AuthModal open={modalOpen} message={errMess} />
      </Box>
    </>
  );
};

export default Layout;
