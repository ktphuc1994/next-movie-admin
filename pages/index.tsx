import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

// import local components
import Layout from '../core/HOC/Layout';

const Home: NextPageWithLayout = () => {
  return <div>Homepage</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Movies List"
      description="A simple admin page for movie management"
    >
      {page}
    </Layout>
  );
};

export default Home;
