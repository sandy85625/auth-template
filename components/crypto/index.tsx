import React from 'react';
import { ethers } from 'ethers';
import { NFTMetadata } from '../../interfaces/nft-forms';
import { transferCryptoUsingMetamask, transferCryptoUsingWallet } from '../../utils/wallet';
import { CHAIN_ID } from '../../constants';
import { ProfileData } from '../../interfaces';

interface CryptoPaymentProps {
    nft: NFTMetadata;
    profile: ProfileData
  }
  
  const CryptoPaymentButton: React.FC<CryptoPaymentProps> = ({ nft, profile }) => {

    const handlePayment = async () => {

      if(profile.walletAccountType === 'metamask' || ''){
        if (window.ethereum) {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
    
                // Use the injected provider directly
                const provider = new ethers.providers.Web3Provider(window.ethereum);
    
                // Get network details
                const network = await provider.getNetwork();
    
                // Check if it's Mainnet. Ethereum Mainnet has a chainId of 1.
                if (network.chainId !== CHAIN_ID) {
                    alert('Please switch to Polygon Mainnet to make payments.');
                    return;
                }
    
                // Get the signer from the provider
                const signer = await provider.getSigner();
    
                await transferCryptoUsingMetamask(nft, signer);
    
            } catch (error: any) {
                alert(`${error}`);
            }
        }
      } else {
          try {
            await transferCryptoUsingWallet(nft, profile)
          } catch (error: any) {
            alert(`Error in Payment. Try again later!`)
          }
      }
    };


    return (
    <button onClick={handlePayment}
      className="w-full my-2 py-2 px-4 text-lg text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200">
      Pay using Crypto
    </button>
  );
};

export default CryptoPaymentButton;