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
    <div onClick={handleClick} className="cursor-pointer bg-gray-300 hover:bg-gray-400 overflow-hidden shadow rounded-lg p-4 m-2">
      <img src={data.image} alt={data.name} className="w-full h-64 object-cover mb-4" />
      <div className="font-bold text-xl mb-2">{data.name}</div>
      {/* <a href={data.externalUrl} target="_blank" rel="noopener noreferrer">External Link</a> */}
      {
        data.attributes.map((attr, index) => (
          <div key={index}>
            <p className="text-grey-darker text-base">{attr.trait_type}: {attr.value.toString().toUpperCase()}</p>
          </div>
        ))
      }
    </div>
  );
}

export default NFTCard;
