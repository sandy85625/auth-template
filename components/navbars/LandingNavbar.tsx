import { useEffect, useState } from 'react';
import Link from 'next/link';


const LandingNavbar: React.FC = () => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);

  useEffect(() => {
    setIsLoginPage(window.location.pathname === '/login');
    setIsSignupPage(window.location.pathname === '/register');
    const isUnauthorized = window.location.pathname === '/unauthorized';

    if (isUnauthorized) {
      setIsLoginPage(true);
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gray-900 py-4 px-6">
      <div className="w-1/2 flex justify-center items-center">
        <Link href="/">
            <img src="/logo.png" alt="Logo" width={100} height={25} />
        </Link>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Link href="/register">
          <div
            className={`px-2 hover:bg-gray-200 hover:text-gray-700 px-4 py-2 rounded-md ${
              isSignupPage ? 'text-gray-700 bg-gray-200 text-gray-700' : 'text-white'
            }`}
          >
            Sign Up
          </div>
        </Link>
        <Link href="/login">
          <div
            className={`px-2 hover:bg-gray-200 hover:text-gray-700 px-4 py-2 rounded-md ${
              isLoginPage ? 'text-gray-700 bg-gray-200 text-gray-700' : 'text-white'
            }`}
          >
            Login
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
