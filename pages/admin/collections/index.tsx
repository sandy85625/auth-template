import Landing from '../../../components/collections/AdminLanding';
import withAuth from '../../../hocs/withAuth';

const Collections = () => {

  return (
    <>
      <Landing />
    </>
  );
}

export default withAuth(Collections)