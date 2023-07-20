import Image from 'next/image';
import { INFT } from '../../interfaces';

interface NFTDetailsProps {
  nft: INFT;
}

export const NFTDetails: React.FC<NFTDetailsProps> = ({ nft }) => {
    if (!nft) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      );
    }
  
    return (
      <div className="my-10 w-1/2 flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mx-auto">
        <div className="md:flex-shrink-0 md:w-56 md:h-56 m-3">
          <Image src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-8">
          <h2 className="block mt-1 text-lg leading-tight font-semibold text-gray-900">{nft.name}</h2>
          <p className="mt-2 text-gray-500">{nft.description}</p>
  
          <div className="mt-6">
            <h4 className="text-sm text-gray-500">Attributes</h4>
            <div className="mt-2">
              <div className="flex items-center">
                <p className="mr-4 text-sm text-gray-700">{nft.attributes.traitName}</p>
                <p className="mr-4 text-sm text-gray-700">{nft.attributes.traitValue}</p>
                <p className="text-sm text-gray-700">{nft.attributes.traitType}</p>
              </div>
            </div>
          </div>
  
          <div className="mt-6">
            <h4 className="text-sm text-gray-500">Base Price</h4>
            <p className="mt-1 text-lg text-gray-700">{nft.basePrice}</p>
          </div>
        </div>
      </div>
    );
  };
  