import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import { ProfileData } from '../interfaces';
import { readProfileData } from '../api/profile';
import { useRouter } from 'next/router';

const withAdminCheck = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { user, loading } = useAuth();
    const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthorized'>('loading');
    const router = useRouter();

    useEffect(() => {
      if (user) {
        readProfileData(user)
          .then((profileData: ProfileData) => {
            if (profileData.role === 'admin') {
              setAuthStatus('authenticated');
            } else {
              setAuthStatus('unauthorized');
            }
          })
          .catch(console.error);
      } else if (!loading) {
        setAuthStatus('unauthorized');
      }
    }, [user, loading]);

    if (authStatus === 'loading') {
      return <LoadingSpinner />;
    }

    if (authStatus === 'unauthorized') {
      router.push('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAdminCheck;
