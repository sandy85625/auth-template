import React from 'react';
import { createBlockchainWallet } from '../../utils/wallet';

interface WalletFormProps {
  walletId: string | null;
  setWalletId: (id: string | null) => void;
  walletPrivateKey: string | null;
  setWalletPrivateKey: (key: string | null) => void;
  walletMnemonicKey: string | null;
  setWalletMnemonicKey: (key: string | null) => void;
  walletAccountType: string | null;
  setWalletAccountType: (key: string | null) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const WalletForm: React.FC<WalletFormProps> = (props) => {
  const createNewWallet = async () => {
    const [id, privateKey, mnemonic] = createBlockchainWallet();
    props.setWalletId(id);
    props.setWalletPrivateKey(privateKey);
    props.setWalletMnemonicKey(mnemonic);
    props.setWalletAccountType('wallet')
    props.goToNextStep();
  };

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        props.setWalletId(accounts[0]);
        props.setWalletAccountType('metamask')
        props.goToNextStep();
      } catch (error: any) {
        alert('Something went wrong! Try again!')
      }
    } else {
      alert('Metamask not found!')
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Wallet Option</h2>
        <button onClick={createNewWallet} className="w-full mb-4 p-2 border border-green-500 bg-green-100 text-green-700 hover:bg-green-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Create New Wallet
        </button>

        <button onClick={connectMetamask} className="w-full p-2 border border-orange-500 bg-orange-100 text-orange-700 hover:bg-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Connect Metamask
        </button>

      <div className="mt-4 flex justify-between">
        <button onClick={props.goToPreviousStep} className="px-4 py-2 rounded border border-gray-400 text-gray-400">
          Previous
        </button>
      </div>
    </div>
  );
}

export default WalletForm;
