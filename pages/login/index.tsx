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
import { Box, CssBaseline } from '@mui/material';
import { ScreenSpinner } from '../../core/components/Spinner/ScreenSpinner';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: userInfo,
    error,
    isLoading,
  } = useSWR('user', userServ.getUserInfo, {
    refreshInterval: 1000 * 60 * 60,
    revalidateOnFocus: false,
  });

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
        <CssBaseline />
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
          {userInfo ? <AlreadyLogin /> : <LoginPage setLoading={setLoading} />}
        </Box>
      </Box>
    </>
  );
};

export default Login;
