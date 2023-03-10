import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

// import local components
import Layout from '../../core/HOC/Layout';

const MovieAndSchedule: NextPageWithLayout = () => {
  return <div>MovieAndSchedule</div>;
};

MovieAndSchedule.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Movies and Schedule" description="Schedule for each movie">
      {page}
    </Layout>
  );
};

export default MovieAndSchedule;
