import Head from 'next/head';

// import local interface
import { InterfaceLayout } from './interface/HOC.interface';

// import local components
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// import MUI components
import { Box } from '@mui/material';

const Layout = ({
  children,
  title,
  description,
  icon = '/favicon.ico',
}: InterfaceLayout) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <link rel="icon" href={icon} />
      </Head>

      <Box component="main" sx={{ display: 'flex' }}>
        <Box component="div" sx={{ flexShrink: 0 }}>
          <Sidebar />
        </Box>
        <Box component="div" sx={{ flexGrow: 1 }}>
          <Header />
          <Box component="div" sx={{ p: '1.5rem' }}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
