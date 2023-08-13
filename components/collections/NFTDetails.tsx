import { useState, useEffect } from "react";
import { NFTMetadata } from "../../interfaces/nft-forms";
import LoadingSpinner from "../loaders/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";
import { readProfileData } from "../../api/profile";
import { ProfileData } from "../../interfaces";
import PaymentForm from "../razorpay";
import { StripePaymentButton } from "../stripe";
import CryptoPaymentButton from "../crypto";

interface NFTDetailsProps {
  nft: NFTMetadata;
}

function isURL(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

export const NFTDetails: React.FC<NFTDetailsProps> = ({ nft: propNft }) => {
  const [nft, setNft] = useState<NFTMetadata | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const { user } = useAuth()

  useEffect(() => {
      setNft(propNft);
  }, [propNft]);

  useEffect(() => {
      if(user) readProfileData(user).then(setProfile).catch(error => {
          console.error(error);
          setProfile(null); // consider setting profile to null or some default state in case of error
      })
  }, [user]);

  if (!nft) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
    return (
      <div className="my-4 w-full md:w-1/2 mx-auto flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden p-2 md:p-4">
        <div className="md:flex-shrink-0 md:w-56 md:h-56 m-2 md:m-4">
          <img src={nft.image} alt={nft.name} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="p-2 md:p-4">
          <h2 className="text-lg leading-tight font-bold text-blue-800">{nft.name}</h2>
          <p className="mt-2 text-gray-700">{nft.description}</p>

          <div className="mt-4">
            <h4 className="text-sm text-blue-600 uppercase tracking-wider">Attributes</h4>
            <div className="mt-2 space-y-1">
              {nft.attributes && nft.attributes.map((attribute, index) => (
                <div key={index} className="flex items-center justify-between">
                <p className="mr-2 md:mr-4 text-sm text-black">{attribute.trait_type} :</p>
                <p className="text-sm text-blue-700">
                  {isURL(attribute.value.toString()) 
                    ? <a href={attribute.value.toString()} target="_blank" rel="noopener noreferrer">Link</a>
                    : attribute.value.toString().toUpperCase()}
                </p>
              </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm text-blue-600 uppercase tracking-wider">Base Price</h4>
            <p className="mt-1 text-lg text-green-600 font-semibold">{nft.basePrice}</p>
          </div>
          <div className="mt-4">
            { 
              nft.isOnSale ? 
                // <PaymentForm nft={nft} profile={profile}/> : 
                <div>
                  <StripePaymentButton nft={nft} walletID={profile.walletID} />
                  <CryptoPaymentButton nft={nft} profile={profile}/> 
                  </div> :
                <div>Not Available for Sale</div> 
            }
          </div>
        </div>
      </div>

    );
  };
  