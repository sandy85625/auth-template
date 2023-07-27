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
    if (user) {
      readProfileData(user)
        .then(data => setProfile(data))
        .catch(error => {
          // Handle the error here, for example, log the error
          console.error('Error fetching profile:', error);
        });
    }
  }, [user]);

  return (
    <div>
      {profile?.role === 'admin' ? (
        // For authenticated users with the role 'admin'
        <AdminNavbar />
      ) : profile?.role === 'user' ? (
        // For authenticated users with the role 'user'
        <DashboardNavbar />
      ) : (
        // For non-authenticated users
        <LandingNavbar />
      )}
    </div>
  );
};

export default Navbar;
