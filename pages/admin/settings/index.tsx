import withAuth from "../../../hocs/withAuth";

const Settings: React.FC = () => {

  return (
    <div className='min-h-screen'>
      <h1>settings</h1>
    </div>
  );
}

export default withAuth(Settings)