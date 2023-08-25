import ComingSoon from "../../../components/collections/ComingSoon";
import withAuth from "../../../hocs/withAuth";

const Reports: React.FC = () => {

  return (
    <div className='min-h-screen'>
      <ComingSoon />
    </div>
  );
}

export default withAuth(Reports)