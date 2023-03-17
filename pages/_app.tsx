import { ReactElement, ReactNode } from 'react';

// import Next
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// import MUI components
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../core/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// import toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// import SWR
import { SWRConfig } from 'swr';
import swrConfig from '../core/config/swrConfig';

// import local context
import { CommonProvider } from '../core/context/CommonContext';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SWRConfig value={swrConfig}>
            <CommonProvider>
              {getLayout(<Component {...pageProps} />)}
            </CommonProvider>
          </SWRConfig>
        </ThemeProvider>
      </LocalizationProvider>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default MyApp;
