import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import { ProfileData } from '../interfaces';
import { readProfileData } from '../api/profile';

const withAuth = (WrappedComponent: React.ComponentType, exceptions: string[] = []) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Fetch the profile data (You can use your own implementation to fetch the profile)
    const [profile, setProfile] = useState<ProfileData | null>(null);

    useEffect(() => {
      // Execute this logic only on the client-side
      if (typeof window !== 'undefined') {
        if (user) {
          readProfileData(user)
            .then(setProfile)
            .catch(() => {
              // If profile data fetch fails, set it to null to indicate unauthorized access
              setProfile(null);
            });
        }
      }
    }, [user]);

    // Check if the user is logged in and the path is not allowed
    const isLoggedIn = !!user; // Convert user object to boolean
    const isAllowedPath = exceptions.includes(router.pathname);

    if (!isLoggedIn && !isAllowedPath) {
      router.push('/login'); // Redirect to login page for unauthorized access
      return <LoadingSpinner />; // Return null to prevent rendering the WrappedComponent
    }

    // Check if the user has the 'admin' role for protected admin routes
    if (profile?.role !== 'admin' && (router.pathname === '/admin' || router.pathname.startsWith('/admin/'))) {
      router.push('/unauthorized'); // Redirect to a page indicating unauthorized access
      return <LoadingSpinner />; // Return null to prevent rendering the WrappedComponent
    }

    if (loading) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
