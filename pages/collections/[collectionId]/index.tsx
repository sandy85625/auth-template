import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/navbars/DashboardNavbar';
import NFTCard from '../../../components/cards/collections-nft-cards/NftCard';
import { INFT } from '../../../interfaces';
import { fetchNFTsByCollectionId } from '../../../api/nft';
import { useAuth } from '../../../hooks/useAuth';
import { fetchCollectionById } from '../../../api/collection';
import Link from 'next/link';


export default function Collections() {
  const router = useRouter();
  const { collectionId } = router.query;
  const [nfts, setNfts] = useState<INFT[]>([]);
  const { user } = useAuth();
  const [collectionName, setCollectionName]= useState<string>('')
  const [collectionDescription, setCollectionDescription]= useState<string>('')

  useEffect(() => {
    if (collectionId && user) {
      fetchNFTsByCollectionId(user.uid, collectionId as string)
        .then(setNfts)
        .catch(console.error);

      fetchCollectionById(user.uid, collectionId as string)
        .then((item) => {
          if (item) {
            setCollectionName(item.name);
            setCollectionDescription(item.description)
          }
        })
        .catch(console.error);
    }
  }, [collectionId, user]);

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="text-2xl text-center my-4">{collectionName}</h2>
        <h2 className="text-sm text-center my-4">{collectionDescription}</h2>
      </div>
      <hr className="my-8 border-gray-300" />
      <div className="flex flex-wrap justify-center">
        {nfts.map((nft, index) => (
            <div key={index}>
          <Link href={`/collections/${collectionId}/${nft.id}`}>
            <NFTCard {...nft} />
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
