import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { readProfileData } from '../../api/profile';
import { ProfileData } from '../../interfaces';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import { NextPage } from 'next';
import Link from 'next/link';
import { NFTMetadata } from '../../interfaces/nft-forms';
import { fetchNFTByWalletId } from '../../api/nft';
import NFTCard from '../../components/cards/collections-nft-cards/NftCard';

const MyCollection: NextPage = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const router = useRouter();
  const [collections, setCollections] = useState<NFTMetadata[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const profileData = await readProfileData(user);
          setProfileData(profileData);
          if (profileData) {
            fetchNFTByWalletId(profileData.walletID).then(setCollections).catch(console.error)
          }
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
    <div className="flex flex-wrap bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
      {/* Sidebar */}
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/profile/collections" className="text-gray-600 hover:text-blue-500">My Collections</Link>
            </li>
            <li>
              <Link href="/profile" className="text-gray-600 hover:text-blue-500">Settings</Link>
            </li>
            {/* Add your other navigation links here */}
          </ul>
        </div>
      </div>
      {/* */}
      <div>
        {collections && collections.map((nft, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <NFTCard href={`/collections/${nft.collectionId}/${nft.id}`} {...nft} />  // Ensure you correctly access the collectionId from the nft object
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCollection;
