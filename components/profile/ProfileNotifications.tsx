// components/profile/ProfileNotifications.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { readProfileData } from '../../api/profile';
import { ProfileData } from '../../interfaces';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';

const ProfileNotifications: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const profileData = await readProfileData(user);
          setProfileData(profileData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [user]);

  if (!profileData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full sm:w-1/2 md:w-3/4 lg:w-4/5 xl:w-5/6 2xl:w-6/7 p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
        No notifications
      </div>
    </div>
  );
};

export default ProfileNotifications;
