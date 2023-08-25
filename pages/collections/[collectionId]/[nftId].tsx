import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchNFTByNFTId } from '../../../api/nft';
import { NFTDetails } from '../../../components/collections/NFTDetails';
import { NFTMetadata } from '../../../interfaces/nft-forms';
import LoadingSpinner from '../../../components/loaders/LoadingSpinner';

export default function NFTExpanded() {
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
    <div className="min-h-screen bg-blue-400 p-4 md:p-8">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {nft ? (
          <NFTDetails nft={nft} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
