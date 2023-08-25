import ComingSoon from '../../../components/collections/ComingSoon';
import withAuth from '../../../hocs/withAuth';

const Datasets = () => {

  return (
    <div className='min-h-screen'>
      <ComingSoon />
    </div>
  );
}

export default withAuth(Datasets)