import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import { ProfileData } from '../interfaces';
import { readProfileData } from '../api/profile';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { user, loading, isException } = useAuth();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthorized'>('loading');

    useEffect(() => {
      if (user) {
        readProfileData(user)
          .then(setProfile)
          .catch(() => {
            setProfile(null);
          });
      } else {
        setAuthStatus('unauthorized');
      }
    }, [user]);

    useEffect(() => {
      const isLoggedIn = !!user; 

      if (loading && !isException) {
        return;
      }

      if (isException) {
        setAuthStatus('authenticated');
        return;
      }
      
      if (!isLoggedIn) {
        setAuthStatus('unauthorized');
      } else if (isLoggedIn && profile?.role !== 'admin' && (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/'))) {
        setAuthStatus('unauthorized');
      } else {
        setAuthStatus('authenticated');
      }
    }, [user, loading, profile, isException]);

    if (authStatus === 'loading') {
      return <LoadingSpinner />;
    }

    if (authStatus === 'unauthorized') {
      return <LoadingSpinner />; 
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};



export default withAuth;
