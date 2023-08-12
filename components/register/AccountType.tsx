import React from 'react';

interface AccountTypeProps {
  accountType: string | null;
  setAccountType: (type: string) => void;
  goToNextStep: () => void;
}

export const AccountType: React.FC<AccountTypeProps> = ({ accountType, setAccountType, goToNextStep }) => {
  const handleSelection = (type: string) => {
    setAccountType(type);
    goToNextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Account Type</h2>

      <div className="mt-4">
        <button 
          onClick={() => handleSelection('personal')}
          className={`px-4 py-2 rounded ${accountType === 'personal' ? 'bg-blue-500 text-white' : 'border border-gray-400 text-gray-400'}`}>
          Personal
        </button>
        <button 
          onClick={() => handleSelection('business')}
          className={`ml-4 px-4 py-2 rounded ${accountType === 'business' ? 'bg-blue-500 text-white' : 'border border-gray-400 text-gray-400'}`}>
          Business
        </button>
      </div>
    </div>
  );
}

export default AccountType;
