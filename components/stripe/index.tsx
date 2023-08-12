import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { NFTMetadata } from "../../interfaces/nft-forms";
import { useAuth } from "../../hooks/useAuth";

interface StripePaymentButtonProps {
  nft: NFTMetadata;
  walletID: string;
}

export const StripePaymentButton: React.FC<StripePaymentButtonProps> = ({ nft, walletID }) => {
  const { user } = useAuth();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_PUBLISHABLE_KEY!);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/v1/checkout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nft: nft, email: user?.email, walletID: walletID })
    })

    if (!response.ok) {
      const error = await response.json();
      alert('Something went wrong! If fund is gone from your account, it will be refunded within 2-3 working days!')
      return;
    }

    const checkoutSession = await response.json();
    const result: any = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id
    })

    if (result.error) {
      alert('Error! In Stripe checkout!');
    }
  }

  return (
    <button 
      onClick={handleCheckout} 
      className="w-full my-2 py-2 px-4 text-lg text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200">
      Buy Now
    </button>
  );
}
