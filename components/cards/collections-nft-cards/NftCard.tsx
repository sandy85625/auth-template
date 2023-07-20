import React from 'react';
import { INFT } from '../../../interfaces';

const NFTCard: React.FC<INFT> = ({ name, imageUrl, externalUrl, shortURL, attributes }) => {
  
  return (
    <div className="bg-gray-300 overflow-hidden shadow rounded-lg p-4 m-2">
      <img src={imageUrl} alt={name} className="w-full h-64 object-cover mb-4" />
      <div className="font-bold text-xl mb-2">{name}</div>
      <a href={externalUrl} target="_blank" rel="noopener noreferrer">External Link</a>
      <p className="text-grey-darker text-base">{shortURL}</p>
      <p className="text-grey-darker text-base">{attributes.traitName}</p>
      <p className="text-grey-darker text-base">{attributes.traitValue}</p>
      <p className="text-grey-darker text-base">{attributes.traitType}</p>
    </div>
  );
}

export default NFTCard;
