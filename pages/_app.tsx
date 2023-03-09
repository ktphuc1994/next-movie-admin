import { ReactElement, ReactNode } from 'react';

// import Next
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// import MUI components
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../core/theme';

// import toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// import SWR
import { SWRConfig } from 'swr';
import swrConfig from '../core/config/swrConfig';

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SWRConfig value={swrConfig}>
          {getLayout(<Component {...pageProps} />)}
        </SWRConfig>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
