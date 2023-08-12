import { useState } from 'react';

// Import components
import { AccountType } from '../components/register/AccountType';
import { UnifiedInformationForm } from '../components/register/UnifiedInformationForm';
import WalletForm from '../components/register/WalletForm';

export default function Register() {

  // States
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<string | null>(null); // either 'personal' or 'business'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gstID, setGstID] = useState('');
  const [walletId, setWalletId] = useState<string | null>(null);
  const [walletAccountType, setWalletAccountType] = useState<string | null>(null);
  const [walletPrivateKey, setWalletPrivateKey] = useState<string | null>(null);
  const [walletMnemonicKey, setWalletMnemonicKey] = useState<string | null>(null);

  const goToNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white p-6 rounded shadow-md">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for an account
        </h2>
      </div>
      <div className='flex justify-center'>
        {step === 1 && (
          <AccountType
            accountType={accountType}
            setAccountType={setAccountType}
            goToNextStep={goToNextStep}
          />
        )}

        {step === 2 && (
          <WalletForm
            walletId={walletId}
            setWalletId={setWalletId}
            walletPrivateKey={walletPrivateKey}
            setWalletPrivateKey={setWalletPrivateKey}
            walletMnemonicKey={walletMnemonicKey}
            setWalletMnemonicKey={setWalletMnemonicKey}
            walletAccountType={walletAccountType}
            setWalletAccountType={setWalletAccountType}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            
          />
        )}
        
        {step === 3 && (
          <UnifiedInformationForm
            accountType={accountType}
            walletId={walletId}
            walletPrivateKey={walletPrivateKey}
            walletMnemonicKey={walletMnemonicKey}
            walletAccountType={walletAccountType}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            gstID={gstID}
            setGstID={setGstID}
            goToPreviousStep={goToPreviousStep}
          />
        )}
        </div>
      </div>
    </div>
  );
}
