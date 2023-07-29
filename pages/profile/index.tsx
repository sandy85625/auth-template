import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { readProfileData } from '../../api/profile';
import Image from 'next/image';
import ProfileField from '../../components/fields/profile-fields/ProfileFields';
import { ProfileData } from '../../interfaces';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import { NextPage } from 'next';
import Link from 'next/link';

const Profile: NextPage = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const router = useRouter();

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

  }, [user, profileData]);

  if (!profileData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-wrap bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <ul className="mt-4 space-y-2">
          <li>
              <Link href="/profile/collections" className="text-gray-600 hover:text-blue-500">My Collections</Link>
            </li>
            <li>
              <Link href="/profile/notifications">
                <div className="text-gray-600 hover:text-blue-500">Notifications</div>
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-gray-600 hover:text-blue-500">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-3/4 lg:w-4/5 p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-5 text-white">Profile</h1>
          <div className="mb-4">
            <Image 
              src={profileData.photoURL || '/placeholder.jpg'} 
              alt="Profile Picture" 
              className="rounded-full" 
              width={100} 
              height={100} 
            />
          </div>
          <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white p-4 rounded-lg shadow-lg">
            <ProfileField label="Name" value={profileData.name} />
            <ProfileField label="Email" value={profileData.email} />
            <ProfileField label="Phone" value={profileData.phone} />
            <ProfileField label="Wallet ID" value={profileData.walletID} />
            <ProfileField label="Private Key" value={profileData.walletPrivateKey} isSensitive />
            <ProfileField label="Mnemonic Phrase" value={profileData.walletMnemonicPhrase} isSensitive />
          </div>
          <div className='px-4 py-2 mt-4'>
            <button onClick={() => router.push('/reset-password')} className='bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-blue-700'>Change Password</button>
            <button onClick={logout} className='bg-red-500 text-white px-4 py-2 mx-2 rounded hover:bg-red-700'>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
