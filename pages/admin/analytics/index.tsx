import ComingSoon from "../../../components/collections/ComingSoon";
import withAuth from "../../../hocs/withAuth";

const Analytics: React.FC = () => {

  return (
    <div className='min-h-screen'>
      <ComingSoon />
    </div>
  );
}

export default withAuth(Analytics)