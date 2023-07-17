import { ethers } from 'ethers';

const createBlockchainWallet = (): [string, string, string] => {
  // Create a new wallet
  const wallet = ethers.Wallet.createRandom();

  // Retrieve the wallet ID, private key, and mnemonic phrase
  const walletID = wallet.address;
  const privateKey = wallet.privateKey;
  const mnemonic = wallet.mnemonic?.phrase || '';

  return [walletID, privateKey, mnemonic];
};

export { createBlockchainWallet };
