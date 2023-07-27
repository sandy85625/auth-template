import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import { ProfileData } from '../interfaces';
import { readProfileData } from '../api/profile';

const withAuth = (WrappedComponent: React.ComponentType, exceptions: string[] = []) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { user, loading } = useAuth();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthorized'>('loading');
  
    useEffect(() => {
      // Fetch the profile data only if the user is authenticated
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
      const isAllowedPath = exceptions.includes(window.location.pathname);
  
      if (loading) {
        return;
      }

      // If we are on an exception route, we don't care about auth state
      if (isAllowedPath) {
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
    }, [user, loading, profile, exceptions]);

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
