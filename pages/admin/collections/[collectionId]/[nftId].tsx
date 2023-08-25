import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchNFTByNFTId } from '../../../../api/nft';
import { NFTDetails } from '../../../../components/collections/NFTDetails';
import { NFTMetadata } from '../../../../interfaces/nft-forms';
import LoadingSpinner from '../../../../components/loaders/LoadingSpinner';
import withAuth from '../../../../hocs/withAuth';

const NFTExpanded = () => {
  const router = useRouter();
  const { nftId, collectionId } = router.query;
  const [nft, setNft] = useState<NFTMetadata | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (nftId && collectionId) {
      fetchNFTByNFTId(collectionId as string, nftId as string)
        .then(setNft)
        .catch((error: Error) => setErrorMessage(error.message));
    }
  }, [nftId, collectionId]);
  

  return (
    <div className="bg-gray-300 min-h-screen">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {nft ? (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <NFTDetails nft={nft} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default withAuth(NFTExpanded)