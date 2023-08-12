import { BigNumber, ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/providers';
import { NFTMetadata } from '../interfaces/nft-forms';
import { updateNFTWalletId } from '../api/nft';
import { ProfileData } from '../interfaces';

const createBlockchainWallet = (): [string, string, string] => {
  // Create a new wallet
  const wallet = ethers.Wallet.createRandom();

  // Retrieve the wallet ID, private key, and mnemonic phrase
  const walletID = wallet.address;
  const privateKey = wallet.privateKey;
  const mnemonic = wallet.mnemonic?.phrase || '';

  return [walletID, privateKey, mnemonic];
};

async function transferCryptoUsingMetamask(
  nft: NFTMetadata,
  signer: ethers.Signer
) {
  // Check if recipient address is valid
  if (!ethers.utils.isAddress(nft.ownerId)) {
    alert(`Cannot accept payment for this NFT! ${nft.ownerId}`);
    return;
  }

  // Get the address from the signer
  const walletID = await signer.getAddress();
    
  const ethAmount = nft.basePrice / 150000;
  const roundedEthAmount = parseFloat(ethAmount.toFixed(18));
  const amountInWei = ethers.utils.parseEther(roundedEthAmount.toString());

  // Create a transaction object
  const transaction = {
    to: nft.ownerId,
    value: amountInWei
  };

  try {
    const txResponse: TransactionResponse = await signer.sendTransaction(transaction);
    const txReceipt = await txResponse.wait();

    if (txReceipt?.status === 1) {
      alert('Payment Successful');
      await updateNFTWalletId(nft.collectionId, nft.id!, walletID);
    } else {
      alert('Payment failed! Try again!');
    }
  } catch (error: any) {
    alert(`Something went wrong! Try again! ${error.data.message}`);
  }
}

async function transferCryptoUsingWallet(
  nft: NFTMetadata,
  profile: ProfileData
) {
  // Create a provider
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_RPC_ENDPOINT!);
  
  // Import sender's wallet using the private key and connect to the provider
  const senderWallet = new ethers.Wallet(profile.walletPrivateKey, provider);
  
  // Check if recipient address is valid
  if (!ethers.utils.isAddress(nft.ownerId)) {
    alert(`Cannot accept payment for this NFT! ${nft.ownerId}`);
    return;
  }

  const ethAmount = nft.basePrice / 150000;
  const roundedEthAmount = parseFloat(ethAmount.toFixed(18));
  const amountInWei = ethers.utils.parseEther(roundedEthAmount.toString());

  // Create a transaction object
  const transaction = {
    to: nft.ownerId,
    value: amountInWei
  };

  try {
    const userConfirmation = window.confirm(`Confirm Payment of ${ethAmount} ETH`);
  
    if (!userConfirmation) {
      alert("Payment cancelled!");
      return;
    }

    const txResponse = await senderWallet.sendTransaction(transaction);
    const txReceipt = await txResponse.wait();

    if (txReceipt?.status === 1) {
      alert('Payment Successful');
      await updateNFTWalletId(nft.collectionId, nft.id!, profile.walletID);
    } else {
      alert('Payment failed! Try again!');
    }
  } catch (error: any) {
    if (error.message && error.message.includes("insufficient funds" || "Insufficient funds")) {
        alert("Insufficient funds for the transaction!");
    } else {
        alert(`Something went wrong! Try again! ${error.data ? error.data.message : error.message}`);
    }
  }
}

export { 
  createBlockchainWallet, 
  transferCryptoUsingMetamask,
  transferCryptoUsingWallet 
};
