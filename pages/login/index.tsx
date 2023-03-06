import { useState } from 'react';

// import Next
import Head from 'next/head';

// import local library
import useSWR from 'swr';

// import local service
import userServ from '../../core/services/userServ';

// import local components
import LoginPage from '../../core/components/Login/LoginPage';
import AlreadyLogin from '../../core/components/Login/AlreadyLogin';
import InnerSpinner from '../../core/components/Spinner/InnerSpinner';

// import MUI Components
import { Box } from '@mui/material';
import { ScreenSpinner } from '../../core/components/Spinner/ScreenSpinner';
import { AxiosError } from 'axios';
import { InterfaceUser } from '../../core/interface/models/user';
import { commonConst } from '../../core/constants/common.const';

const Login = () => {
  const rejectedErr = commonConst.loginRejectedError;
  const [loading, setLoading] = useState<boolean>(false);

  const { data: userInfo, isLoading } = useSWR<InterfaceUser, AxiosError>(
    'user',
    userServ.getUserInfo,
    {
      onErrorRetry(err) {
        if (rejectedErr.includes(err.response?.status)) return;
      },
    }
  );

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Login into this page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        component="main"
        sx={{
          width: '100vw',
          height: '100vh',
          background: 'url(./login-bg.webp)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoading ? <ScreenSpinner bg="rgba(0, 0, 0, 0.4)" /> : null}
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(7px)',
            borderRadius: '12px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <Box
            component="div"
            sx={{
              display: `${loading ? 'block' : 'none'}`,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '12px',
              zIndex: 10,
            }}
          >
            <InnerSpinner size="3rem" />
          </Box>
          {userInfo && userInfo.loaiNguoiDung === 'ADMIN' ? (
            <AlreadyLogin />
          ) : (
            <LoginPage setLoading={setLoading} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Login;
