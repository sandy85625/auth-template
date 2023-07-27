import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
    if(!user){
      router.push('/login')
    }
    
    if (collectionId && user) {
      fetchNFTsByCollectionId(collectionId as string)
        .then(setNfts)
        .catch((error: Error) => setErrorMessage(error.message));

      fetchCollectionById(collectionId as string)
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
    <div className="bg-blue-200 p-2 md:p-4">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="bg-white shadow rounded-lg p-4 md:p-6 my-2 md:m-4">
        <h2 className="text-2xl text-center my-4 font-bold text-blue-800">{collectionName}</h2>
        <p className="text-sm text-center text-blue-700 my-2">{collectionDescription}</p>
        <p className="text-lg text-center font-semibold text-green-600 mt-2">Base Price: {collectionBasePrice} INR</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4 md:p-6 my-2 md:m-4 flex flex-wrap justify-center">
        {nfts.map((nft, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <NFTCard href={`/collections/${collectionId}/${nft.id}`} {...nft} />
          </div>
        ))}
      </div>
    </div>
  );
}
