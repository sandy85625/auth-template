import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { INFT } from '../../../interfaces';
import { fetchNFTById } from '../../../api/nft';
import Navbar from '../../../components/navbars/DashboardNavbar';
import { useAuth } from '../../../hooks/useAuth';
import { NFTDetails } from '../../../components/collections/NFTDetails';

export default function NFTExpanded() {
  const router = useRouter();
  const { nftId, collectionId } = router.query;
  const [nft, setNft] = useState<INFT | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (nftId && user) {
      fetchNFTById(user.uid, collectionId as string, nftId as string)
        .then(setNft)
        .catch(console.error);
    }
  }, [nftId, collectionId, user]);

  return (
    <div className="bg-gray-300 min-h-screen">
      <Navbar />
      {nft ? (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <NFTDetails nft={nft} />
        </div>
      ) : (
        <p className="text-center py-6">Loading...</p>
      )}
    </div>

  );
}
