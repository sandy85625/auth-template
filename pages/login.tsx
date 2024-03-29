import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { readProfileData } from '../api/profile';
import Link from 'next/link';
import { ProfileData } from '../interfaces';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const auth = getAuth(app);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
  
      // If there's a valid user object, proceed further
      if (user) {
        try {
          const profile: ProfileData | null = await readProfileData(user);
  
          // Redirect based on profile role
          if (profile?.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/');
          }
        } catch (error: any) {
          // If the error is due to the user not having a profile, redirect to the registration page
          if (
            error.message.includes('profile') ||
            (error.data && error.data.message.includes('profile'))
          ) {
            router.push('/register');
            alert("It seems like you haven't registered yet. Please sign up!");
          } else {
            throw new Error('Profile fetch error. Not a new user error!');
          }
        }
      } else {
        alert('Authentication successful, but no user information was retrieved. Please try again.');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };  

  const googleSignIn = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // If there's a valid user object, proceed further
      if (user) {
        // You can add any additional checks or logic here
  
        try {
          const profile: ProfileData | null = await readProfileData(user);
  
          // Redirect based on profile role
          if (profile?.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/');
          }
        } catch (error: any) {
          // If the error is due to the user not having a profile, redirect to the registration page
          if (
            error.message.includes('profile') ||
            (error.data && error.data.message.includes('profile'))
          ) {
            router.push('/register');
            alert("It seems like you haven't registered yet. Please sign up!")
          } else {
            throw new Error('Profile fetch error. Not a new user error!');
          }
        }
      } else {
        alert('Authentication successful, but no user information was retrieved. Please try again.');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  
  return (
    <>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white p-6 rounded shadow-md">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="/reset-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className="text-sm">
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              New user? Register Now
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
      <div>
        <button onClick={googleSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</>
  );
}