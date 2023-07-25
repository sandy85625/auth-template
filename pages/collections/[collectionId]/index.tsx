import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/navbars/DashboardNavbar';
import NFTCard from '../../../components/cards/collections-nft-cards/NftCard';
import { fetchNFTsByCollectionId } from '../../../api/nft';
import { useAuth } from '../../../hooks/useAuth';
import { fetchCollectionById } from '../../../api/collection';
import { NFTMetadata } from '../../../interfaces/nft-forms';

export default function Collections() {
  const router = useRouter();
  const { collectionId } = router.query;
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const { user } = useAuth();
  const [collectionName, setCollectionName]= useState<string>('');
  const [collectionDescription, setCollectionDescription]= useState<string>('');
  const [collectionBasePrice, setCollectionBasePrice]= useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (collectionId && user) {
      fetchNFTsByCollectionId(user.uid, collectionId as string)
        .then(setNfts)
        .catch((error: Error) => setErrorMessage(error.message));

      fetchCollectionById(user.uid, collectionId as string)
        .then((item) => {
          if (item) {
            setCollectionName(item.CollectionName);
            setCollectionDescription(item.CollectionDescription);
            setCollectionBasePrice(item.CollectionBasePrice);
          }
        })
        .catch((error: Error) => setErrorMessage(error.message));
    }
  }, [collectionId, user]);

  return (
    <div>
      <Navbar />
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="bg-gray-100 shadow rounded-lg p-6 m-4">
        <h2 className="text-2xl text-center my-4 font-bold">{collectionName}</h2>
        <p className="text-sm text-center text-gray-700 my-2">{collectionDescription}</p>
        <p className="text-lg text-center font-semibold text-green-600 mt-2">Base Price: {collectionBasePrice} INR</p>
      </div>
      <div className="bg-gray-100 shadow rounded-lg p-6 m-4 flex flex-wrap justify-center">
        {nfts.map((nft, index) => (
          <div key={index}>
            <NFTCard href={`/collections/${collectionId}/${nft.id}`} {...nft} />
          </div>
        ))}
      </div>
    </div>
  );
}
