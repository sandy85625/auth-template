import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NFTMetadata } from '../../../interfaces/nft-forms';
import { reupdateIsOnSale } from '../../../api/nft';

interface NFTCardProps extends NFTMetadata {
  href: string;
}

const ProfileNFTCard: React.FC<NFTCardProps> = ({ href, ...data }) => {
  const router = useRouter();
  const [publish, setPublish] = useState<boolean>(data.isOnSale)
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    router.push(href)
  }

  const publishHandler = async () => {
    const newPublishState = !publish;
    setPublish(newPublishState);
    
    try {
      await reupdateIsOnSale(data.collectionId, data.id!, newPublishState);
    } catch (error) {
      console.error(error);
      // If there's an error, revert the publish state
      setPublish(!newPublishState);
      // And set the error state to show an error message
      setError('Failed to update publish state. Please try again.');
    }
  }

  return (
    <>
      { data &&
      <>
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
      {
        error && <div className="error-message">{error}</div>
      }
      <button onClick={publishHandler} className='w-full py-2 px-4 text-lg text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200'>{publish ? `Published! Click again for revert!`: `Publish for Sale`}</button> 
      </>
      }
  </>

  );
}

export default ProfileNFTCard;
