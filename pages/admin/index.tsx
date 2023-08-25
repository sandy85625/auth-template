import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Landing from '../../components/dashboard/AdminLanding';
import withAuth from '../../hocs/withAuth';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <Landing />
    </div>
  );
}

export default withAuth(Dashboard);