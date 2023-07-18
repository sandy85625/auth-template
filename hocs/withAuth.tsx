import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/loaders/LoadingSpinner';

const withAuth = (WrappedComponent: React.ComponentType, exceptions: string[] = []) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user && !exceptions.includes(router.pathname)) {
        router.push('/login');
      }
    }, [user, loading, router, exceptions]);

    if (loading || (!exceptions.includes(router.pathname) && !user)) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
