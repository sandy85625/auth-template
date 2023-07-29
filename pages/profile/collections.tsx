import { useState, useEffect } from 'react';
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
    <div className="flex flex-wrap bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 min-h-screen text-white">
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7 bg-white text-black shadow-lg">
        <div className="p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/profile/collections">
                <div className="text-gray-600 hover:text-blue-500">My Collections</div>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <div className="text-gray-600 hover:text-blue-500">Settings</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-3/4 lg:w-4/5 xl:w-5/6 2xl:w-6/7 p-4 sm:p-6">
        <h2 className="text-2xl font-bold mb-4">My NFTs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
          {collections && collections.map((nft, index) => (
            <div key={index}>
              <NFTCard href={`/collections/${nft.collectionId}/${nft.id}`} {...nft} />
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default MyCollection;
