import { useState } from 'react';

// import Next
import Head from 'next/head';

// import local library
import useSWR from 'swr';

// import local hooks
import { useCommonContext } from 'core/context/CommonContext';

// import local service
import userServ from 'core/services/userServ';

// import local components
import LoginPage from 'core/components/Login/LoginPage';
import AlreadyLogin from 'core/components/Login/AlreadyLogin';
import { ScreenSpinner } from 'core/components/Spinner/ScreenSpinner';
import InnerSpinner from 'core/components/Spinner/InnerSpinner';

// import type and interface
import { InterfaceUser } from 'core/interface/models/user';
import { InterfaceCommonContext } from 'core/context/interface/common.interface';

// import MUI Components
import Box from '@mui/material/Box';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useCommonContext() as InterfaceCommonContext;

  const { data: userInfo, isLoading } = useSWR<InterfaceUser>(
    'user',
    userServ.getUserInfo,
    {
      onSuccess: (data) => {
        setUser(data);
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
            margin: '0.5rem',
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
