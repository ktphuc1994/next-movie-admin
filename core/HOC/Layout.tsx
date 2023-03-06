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

  const { data: userInfo } = useSWR<
    InterfaceUser,
    AxiosError<{ error: string; message: string }>
  >('user', userServ.getUserInfo, {
    onError: (err) => {
      const token = localServ.getToken();
      if (!token) {
        setErrMess('Vui lòng đăng nhập để tiếp tục truy cập');
        setModalOpen(true);
        return;
      }

      const rejectedErr = commonConst.loginRejectedError;
      if (err.response) {
        if (
          rejectedErr.includes(err.response.status) &&
          err.response.data.message === 'Unauthorized. Token related'
        ) {
          setErrMess('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
          setModalOpen(true);
          return;
        }
        toast(err.response.data.message, { type: 'error' });
      }
    },
    onErrorRetry(err) {
      const rejectedErr = commonConst.loginRejectedError;
      if (err.response && rejectedErr.includes(err.response.status)) return;
    },
  });

  useEffect(() => {
    if (userInfo && userInfo?.loaiNguoiDung !== 'ADMIN') {
      setErrMess(
        'Người dùng không đủ quyền truy cập, vui lòng sử dụng tài khoản khác.'
      );
      setModalOpen(true);
    }
    return () => {
      setModalOpen(false);
    };
  }, [userInfo]);

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
        <Box component="div" sx={{ flexGrow: 1, px: '1.5rem' }}>
          <Header sideOpen={sideOpen} setSideOpen={setSideOpen} />
          <Box component="div">
            {userInfo !== undefined && userInfo.loaiNguoiDung === 'ADMIN' ? (
              children
            ) : (
              <InnerSpinner />
            )}
          </Box>
          <Footer />
        </Box>
        <AuthModal open={modalOpen} message={errMess} />
      </Box>
    </>
  );
};

export default Layout;
