import React, { useState } from 'react';

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { app } from '../../firebase/firebase.config';
import { useRouter } from 'next/router';
import { doesProfileExist, saveProfileData } from '../../api/profile';

interface InformationFormProps {
  accountType: string | null;
  walletId: string | null;
  walletPrivateKey: string | null;
  walletMnemonicKey: string | null;
  walletAccountType: string | null;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  gstID?: string; 
  setGstID?: (value: string) => void; 
  goToPreviousStep: () => void;
}

export const UnifiedInformationForm: React.FC<InformationFormProps> = (props) => {

  const router = useRouter();
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (props.password !== props.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    const auth = getAuth(app);
    try {

      createUserWithEmailAndPassword(auth, props.email, props.password)
        .then(async (response) => {
          const user = response.user;

          // Assign user role based on "accountType" state
          const role = props.accountType === 'business' ? 'admin' : 'user';
      
          await sendEmailVerification(user);
          await saveProfileData(
            props.name, 
            props.email, 
            props.phone,
            '',
            user,
            role,
            props.walletId || '',
            props.walletPrivateKey || '',
            props.walletMnemonicKey || '',
            props.gstID || '',
            props.walletAccountType || ''
          );
          alert(`Registration successful. Redirecting to login!`)
          router.push('/login');
        }).catch((error: any) => {
          if(error.message.includes('auth/email-already-in-use')) alert(`Email already exists! Try login`)
          else if(error.message.includes('auth/weak-password')) alert(`Weak password! Use another password with atleast 6 character with alphabets and numbers`)
          else if(error.message.includes('auth/missing-email')) alert(`Please provide an email!`)
          else if(error.message.includes('auth/invalid-email')) alert(`Please provide an correct email!`)
          else alert(`Invalid information provided!`);
        })
  
    } catch (error: any) {
      alert(`Something went wrong! Try again!`);
    }
  };

  const googleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        // Check if profile exists
        const profileExists = await doesProfileExist(user);
  
        if (!profileExists) {
          // Assign user role based on "accountType" prop
          const role = props.accountType === 'business' ? 'admin' : 'user';
  
          await saveProfileData(
            user.displayName || '', 
            user.email || '', 
            user.phoneNumber || '', 
            user.photoURL || '',
            user,
            role,
            props.walletId || '',
            props.walletPrivateKey || '',
            props.walletMnemonicKey || '',
            props.gstID || '',
            props.walletAccountType || ''
          );
        }
  
        // Navigate based on role
        const role = props.accountType === 'business' ? 'admin' : 'user';
        if(role === 'admin'){
          router.push('/admin')
        } else {
          router.push('/home');
        }
      } else {
        throw new Error('No user found');
      }
    } catch (error: any) {
      alert('Something went wrong! Try again');
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{props.accountType === 'personal' ? 'Personal Information' : 'Business Information'}</h2>
      <div className="mt-4 space-y-4">
        <input 
          type="text"
          placeholder="Full Name"
          required
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="email"
          placeholder="Email"
          required
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="password"
          placeholder="Password"
          required
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="password"
          placeholder="Confirm Password"
          required
          value={props.confirmPassword}
          onChange={(e) => props.setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="text"
          placeholder="Phone Number"
          required
          value={props.phone}
          onChange={(e) => props.setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {props.accountType === 'business' && (
          <input 
            type="text"
            placeholder="GST ID"
            value={props.gstID || ''}
            onChange={(e) => props.setGstID && props.setGstID(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        )}
      </div>
      <div className="flex items-center space-x-2 my-4">
        <input 
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />
        <span>
          I accept the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline">Terms and Conditions</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a>
        </span>
      </div>
      <div className="py-4 md:py-2 space-y-4">
        <div className="flex justify-between space-x-4">
          <button onClick={props.goToPreviousStep} className="px-4 py-2 rounded border border-gray-400 text-gray-400">
            Previous
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={!acceptedTerms} 
            className={`px-4 py-2 ${acceptedTerms ? 'bg-blue-500 hover:bg-blue-600 focus:bg-blue-700' : 'bg-blue-300'} text-white rounded`}
          >
            Submit
          </button>
        </div>
        <hr className='border-t border-gray-300 my-4' />
        <button 
          onClick={googleSignIn} 
          disabled={!acceptedTerms} 
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${acceptedTerms ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-red-300'}`}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

