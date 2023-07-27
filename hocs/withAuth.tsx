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
            // If profile data fetch fails, set it to null to indicate unauthorized access
            setProfile(null);
          });
      } else {
        // If the user is not logged in, mark the auth status as unauthorized
        setAuthStatus('unauthorized');
      }
    }, [user]);

    useEffect(() => {
      // Check if the user is logged in and the path is not allowed
      const isLoggedIn = !!user; // Convert user object to boolean
      const isAllowedPath = exceptions.includes(window.location.pathname);

      if (loading) {
        // Still loading, wait for the authentication check to complete
        return;
      }

      if (!isLoggedIn && !isAllowedPath) {
        // Redirect to login page for unauthorized access
        setAuthStatus('unauthorized');
      } else if (isLoggedIn && profile?.role !== 'admin' && (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/'))) {
        // Redirect to unauthorized page for non-admin users accessing admin routes
        setAuthStatus('unauthorized');
      } else {
        // Authenticated, set the status accordingly
        setAuthStatus('authenticated');
      }
    }, [user, loading, profile, exceptions]);

    if (authStatus === 'loading') {
      // Show loading spinner while fetching profile data
      return <LoadingSpinner />;
    }

    if (authStatus === 'unauthorized') {
      // Redirect to login/unauthorized page
      // You can customize the redirect URL as needed
      return <LoadingSpinner />; // For simplicity, showing the loading spinner, but you can render a Redirect component here.
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
