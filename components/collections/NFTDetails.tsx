import { useState, useEffect } from "react";
import { NFTMetadata } from "../../interfaces/nft-forms";
import LoadingSpinner from "../loaders/LoadingSpinner";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../../hooks/useAuth";
import { readProfileData } from "../../api/profile";
import { ProfileData } from "../../interfaces";
import { updateNFTWalletId } from "../../api/nft";

interface NFTDetailsProps {
  nft: NFTMetadata;
}

export const NFTDetails: React.FC<NFTDetailsProps> = ({ nft: propNft }) => {
  const [nft, setNft] = useState<NFTMetadata | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    readProfileData(user!).then(setProfile).catch(console.error)
    setNft(propNft);
  }, [propNft]);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_PUBLISHABLE_KEY!)

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/v1/checkout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({nft: nft, email: user?.email})
    })

    if (!response.ok) {
      const error = await response.json()
      // Handle any server-side errors here.
      console.log('Error:', JSON.stringify(error, null, 2));
      return;
    }

    const checkoutSession = await response.json()

    const result: any = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id
    })

    if(result.error){
      alert('error! in stripe checkout!')
      return;
    }

    if(profile && nft && nft.collectionId && nft.id){
      await updateNFTWalletId(nft.collectionId, nft.id, profile.walletID)
    }
  }

  if (!nft) {
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
                  <p className="text-sm text-blue-700">{attribute.value.toString().toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm text-blue-600 uppercase tracking-wider">Base Price</h4>
            <p className="mt-1 text-lg text-green-600 font-semibold">{nft.basePrice}</p>
          </div>
          <div className="mt-4">
            <button onClick={handleCheckout} className="w-full py-2 px-4 text-lg text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200">Purchase</button>
          </div>
        </div>
      </div>

    );
  };
  