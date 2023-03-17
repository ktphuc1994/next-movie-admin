import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

// import local components
import Layout from '../core/HOC/Layout';

const UserManagement: NextPageWithLayout = () => {
  return <div>UserManagement</div>;
};

UserManagement.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Movies and Schedule" description="Schedule for each movie">
      {page}
    </Layout>
  );
};

export default UserManagement;
