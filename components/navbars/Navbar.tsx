import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminNavbar from './AdminNavbar';
import LandingNavbar from './LandingNavbar';
import { ProfileData } from '../../interfaces';
import { readProfileData } from '../../api/profile';
import DashboardNavbar from './DashboardNavbar';

const Navbar = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    // Execute this logic only on the client-side
    if (typeof window !== 'undefined' && user) {
      readProfileData(user)
        .then(data => setProfile(data))
        .catch(error => {
          setProfile(null);
        });
    }
  }, [user]);

  // Check if the user is authenticated and the profile data has been fetched
  const isLoggedIn = !!user;
  const isProfileFetched = profile !== null;

  return (
    <div>
      {isLoggedIn && isProfileFetched && profile?.role === 'admin' ? (
        // For authenticated users with the role 'admin'
        <AdminNavbar />
      ) : isLoggedIn && isProfileFetched && profile?.role === 'user' ? (
        // For authenticated users with the role 'user'
        <DashboardNavbar />
      ) : (
        // For non-authenticated users or when profile data is still being fetched
        <LandingNavbar />
      )}
    </div>
  );
};

export default Navbar;
