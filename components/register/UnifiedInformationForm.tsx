import React from 'react';

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../firebase/firebase.config';
import { useRouter } from 'next/router';
import { doesProfileExist, saveProfileData } from '../../api/profile';

interface InformationFormProps {
  accountType: string | null;
  walletId: string | null;
  walletPrivateKey: string | null;
  walletMnemonicKey: string | null;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (props.password !== props.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    const auth = getAuth(app);
    try {
      // Check if the user exists
      const existingUser = await signInWithEmailAndPassword(auth, props.email, props.password);
      if (existingUser) {
        alert('User already exists');
        return;
      }
  
      const { user } = await createUserWithEmailAndPassword(auth, props.email, props.password);
  
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
        props.gstID || ''
      );
      router.push('/login');
    } catch (error: any) {
      alert(error.message);
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
            props.gstID || ''
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
      alert(error.message);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{props.accountType === 'personal' ? 'Personal Information' : 'Business Information'}</h2>
      <div className="mt-4 space-y-4">
        <input 
          type="text"
          placeholder="Full Name"
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="email"
          placeholder="Email"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="password"
          placeholder="Password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="password"
          placeholder="Confirm Password"
          value={props.confirmPassword}
          onChange={(e) => props.setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="text"
          placeholder="Phone Number"
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
      <div className="py-4 md:py-2 space-y-4">
        <div className="flex justify-between space-x-4">
          <button onClick={props.goToPreviousStep} className="px-4 py-2 rounded border border-gray-400 text-gray-400">
            Previous
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700">
            Submit
          </button>
        </div>
        <hr className='border-t border-gray-300 my-4' />
        <button onClick={googleSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

