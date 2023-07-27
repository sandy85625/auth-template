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
        if (!loading && !user && !exceptions.includes(router.pathname)) {
          router.push('/login');
        }
        if (user) {
          readProfileData(user)
            .then(setProfile)
            .catch((err) => {
              router.push('/unauthorized'); // Redirect to an appropriate error page
            });
        }
      }
    }, [user, loading, router, exceptions]); // Remove 'profile' from the dependency array

    // Check if the user has the 'admin' role before rendering the component
    if (typeof window === 'undefined' && profile == null) {
      return <LoadingSpinner />; // Return loading state on the server-side
    }

    if(profile !== null) {
      if (profile.role !== 'admin' && (router.pathname === '/admin' || router.pathname.startsWith('/admin/'))) {
        router.push('/unauthorized'); // Redirect to a page indicating unauthorized access
        return <LoadingSpinner />; // Return null to prevent rendering the WrappedComponent
      }
    }
    else{
      router.push('/login')
    }

    

    if (loading || (!exceptions.includes(router.pathname) && !user)) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
