import { useEffect, useState } from 'react';
import axios from 'axios';
import Script from 'next/script';
import { NFTMetadata } from '../../interfaces/nft-forms';
import { ProfileData } from '../../interfaces';
import { updateNFTWalletId } from '../../api/nft';

interface Order {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  // Add other properties as required
}

interface PaymentFormProps {
  profile: ProfileData;
  nft: NFTMetadata;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ nft, profile }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null); // Add a state for storing errors

  useEffect(() => {
    async function createOrder() {
      try {
        const response = await axios.post('/api/v1/order', { amount: nft.basePrice })
        setOrder(response.data);
      } catch (err: any) {
        // Set the error state with the error message
        setError(`Error creating order: ${err.message}`);
      }
    }
    createOrder();
  }, []);

  const displayRazorpay = async () => {
    if (order) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY!,
        currency: order.currency,
        amount: order.amount.toString(),
        order_id: order.id,
        name: nft.name,
        description: nft.description,
        handler: async function (response: any) {
          // Here you should handle the payment response and perform further actions like saving the transaction in your DB, etc.
          // Add your error handling logic here as well
          if (response.error) {
            setError(`Payment failed: ${response.error.description}`);
            return;
          }

          if(profile && nft && nft.collectionId && nft.id){
            try {
              await updateNFTWalletId(nft.collectionId, nft.id, profile.walletID);
            } catch (error) {
              setError(`Failed to update NFT Wallet ID: ${error}`);
            }
          }
        }
      };
  
      try {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err: any) {
        setError(`Error opening Razorpay: ${err.message}`);
      }
    }
  };

  if (error) {
    return <p>Error: {error}</p>; // Show the error message if there's an error
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button onClick={displayRazorpay} className='w-full py-2 px-4 text-lg text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200'>Buy</button>
    </>
  );
};

export default PaymentForm