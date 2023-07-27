import React from 'react';
import { useRouter } from 'next/router';
import { NFTMetadata } from '../../../interfaces/nft-forms';

interface NFTCardProps extends NFTMetadata {
  href: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ href, ...data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href)
  }

  return (
    <>
      { data &&
      <div onClick={handleClick} className="cursor-pointer overflow-hidden shadow-lg rounded-lg m-2 bg-gradient-to-br from-blue-500 to-purple-600 transform transition duration-500 ease-in-out hover:scale-105">
        <img src={data.image} alt={data.name} className="w-full h-64 object-cover mb-4" />
        <div className="p-4">
          <div className="font-bold text-xl text-white mb-2">{data.name}</div>
          {/* <a href={data.externalUrl} target="_blank" rel="noopener noreferrer">External Link</a> */}
          {
            data.attributes && data.attributes.map((attr, index) => (
              <div key={index}>
                <p className="text-white text-sm">{attr.trait_type}: {attr.value.toString().toUpperCase()}</p>
              </div>
            ))
          }
        </div>
      </div>
      }
  </>

  );
}

export default NFTCard;
