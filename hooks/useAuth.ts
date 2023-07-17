import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const logout = () => {
    const auth = getAuth(app);
    signOut(auth).catch((error) => alert(error.message));
  };

  return { user, loading, logout };
}
