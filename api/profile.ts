import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { createBlockchainWallet } from '../utils/wallet';
import { User } from '@firebase/auth';
import { database} from '../firebase/firebase.config';

const readProfileData = async (user: User): Promise<any> => {
  
    if (user) {
      const profileRef = doc(database, 'profiles', user.uid);
  
      try {
        const profileSnapshot = await getDoc(profileRef);
        if (profileSnapshot.exists()) {
          return profileSnapshot.data();
        } else {
          throw new Error('Profile data not found.');
        }
      } catch (error: any) {
        throw new Error('Failed to read profile data. Please try again later.');
      }
    } else {
      throw new Error('User not authenticated.');
    }
  };

  const saveProfileData = async (
    name: string, 
    email: string, 
    phone: string,
    photoURL: string,
    user: User,
    role: string
    ) => {
  
    if (user) {
      const profileRef = doc(database, 'profiles', user.uid);
      const [id, privateKey, mnemonic] = createBlockchainWallet();
  
      try {
        await setDoc(profileRef, {
          name,
          email,
          phone,
          photoURL,
          role,
          walletID: id,
          walletPrivateKey: privateKey,
          walletMnemonicPhrase: mnemonic,
        });
      } catch (error: any) {
        throw new Error('Failed to save profile data. Please try again later.');
      }
    } else {
      throw new Error('User not authenticated.');
    }
  };  
  
  const updateProfileData = async (user: User, profileData: any) => {
  
    if (user) {
      const profileRef = doc(database, 'profiles', user.uid);
  
      try {
        await updateDoc(profileRef, profileData);
      } catch (error: any) {
        throw new Error('Failed to update profile data. Please try again later.');
      }
    } else {
      throw new Error('User not authenticated.');
    }
  };
  
  const deleteProfileData = async (user: User) => {
  
    if (user) {
      const profileRef = doc(database, 'profiles', user.uid);
  
      try {
        await deleteDoc(profileRef);
      } catch (error: any) {
        throw new Error('Failed to delete profile data. Please try again later.');
      }
    } else {
      throw new Error('User not authenticated.');
    }
  };

export {
    readProfileData,
    saveProfileData,
    updateProfileData,
    deleteProfileData
}
  