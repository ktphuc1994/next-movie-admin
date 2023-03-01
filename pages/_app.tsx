import { ReactElement, ReactNode } from 'react';

// import Next
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// import MUI components
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../core/theme';

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
      {getLayout(
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      )}
    </>
  );
}

export default MyApp;
