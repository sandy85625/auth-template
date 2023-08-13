import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { NFTMetadata } from '../../../interfaces/nft-forms';

interface NFTCardProps extends NFTMetadata {
  href: string;
}

// Utility function to check if a string is a URL
const isURL = (str: string): boolean => {
  return /^https?:\/\/[\S]+$/i.test(str);
}

interface AttributeProps {
  trait_type: string;
  value: string | number;
}

const Attribute: React.FC<AttributeProps> = ({ trait_type, value }) => {
  const displayValue = value.toString();

  let content: ReactNode = displayValue.toUpperCase();

  if (isURL(displayValue) && displayValue.length > 10) {
    content = (
      <a href={displayValue} target="_blank" rel="noopener noreferrer">
        Click to view
      </a>
    );
  } else if (isURL(displayValue)) {
    content = (
      <a href={displayValue} target="_blank" rel="noopener noreferrer">
        {displayValue.toUpperCase()}
      </a>
    );
  }

  return (
    <div>
      <p className="text-white text-sm">{trait_type}: {content}</p>
    </div>
  );
}
const NFTCard: React.FC<NFTCardProps> = ({ href, ...data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href)
  }

  return (
    <>
      {data &&
        <div 
          onClick={handleClick} 
          className="cursor-pointer overflow-hidden shadow-lg rounded-lg m-2 bg-gradient-to-br from-blue-500 to-purple-600 transform transition duration-500 ease-in-out hover:scale-105"
        >
          <img src={data.image} alt={data.name} className="w-full h-64 object-cover mb-4" />
          <div className="p-4">
            <div className="font-bold text-xl text-white mb-2">{data.name}</div>
            {data.attributes && data.attributes.map((attr, index) => (
              <Attribute key={index} {...attr} />
            ))}
          </div>
        </div>
      }
    </>
  );
}

export default NFTCard;
