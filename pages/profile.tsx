import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { readProfileData } from '../api/profile';
import Image from 'next/image';
import ProfileField from '../components/fields/profile-fields/ProfileFields';
import Navbar from '../components/navbars/DashboardNavbar';
import { ProfileData } from '../interfaces';
import LoadingSpinner from '../components/loaders/LoadingSpinner';


const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const router = useRouter();

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (user) { // Check if user is not null
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
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold mb-5 text-gray-600">Profile</h1>
      <div className="mb-4">
        <Image 
          src={profileData.photoURL || '/placeholder.jpg'} 
          alt="Profile Picture" 
          className="rounded-full" 
          width={100} 
          height={100} 
        />
      </div>
      <div className="w-1/2 bg-white p-4 rounded shadow-lg">
        <ProfileField label="Name" value={profileData.name} />
        <ProfileField label="Email" value={profileData.email} />
        <ProfileField label="Phone" value={profileData.phone} />
        <ProfileField label="Wallet ID" value={profileData.walletID} />
        <ProfileField label="Private Key" value={profileData.walletPrivateKey} isSensitive />
        <ProfileField label="Mnemonic Phrase" value={profileData.walletMnemonicPhrase} isSensitive />
      </div>
      <div className='px-4 py-2'>
        <button onClick={() => router.push('/reset-password')} className='bg-red-500 text-white px-4 py-2 mx-2 rounded hover:bg-red-700'>Change Password</button>
        <button onClick={logout} className='bg-red-500 text-white px-4 py-2 mx-2 rounded hover:bg-red-700'>Logout</button>
      </div>
    </div>
    </>
    );
  };

export default Profile;
