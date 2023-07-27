import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Landing from '../../components/dashboard/AdminLanding';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) return <LoadingSpinner />;
  return (
    <div>
      <Landing user={user} />
    </div>
  );
}
