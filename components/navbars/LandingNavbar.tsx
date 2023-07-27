import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LandingNavbar: React.FC = () => {
  const router = useRouter();
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // move logic inside a useEffect that depends on router.pathname
  useEffect(() => {
    setIsLoginPage(router.pathname === '/login');
    setIsSignupPage(router.pathname === '/register');
    const isUnauthorized = router.pathname === '/unauthorized';
  
    if (isUnauthorized) {
      setIsLoginPage(true);
    }
  }, [router.pathname]); // add dependency

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-4 px-6 md:flex-row md:justify-around">
      <div className="flex justify-center items-center">
        <Link href="/">
            <Image src="/logo.png" alt="Logo" width={100} height={25} />
        </Link>
      </div>
      <div className={`md:hidden ${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col space-y-4 py-2 absolute w-full left-0 top-full bg-gray-800`}>
        <Link href="/register">
          <div
            className={`px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors ${
              isSignupPage ? 'bg-white text-green-400' : ''
            }`}
          >
            Sign Up
          </div>
        </Link>
        <Link href="/login">
          <div
            className={`px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors ${
              isLoginPage ? 'bg-white text-green-400' : ''
            }`}
          >
            Login
          </div>
        </Link>
      </div>
      <div className="hidden md:flex justify-center items-center space-x-4">
        <Link href="/register">
          <div
            className={`px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors ${
              isSignupPage ? 'bg-white text-green-400' : ''
            }`}
          >
            Sign Up
          </div>
        </Link>
        <Link href="/login">
          <div
            className={`px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors ${
              isLoginPage ? 'bg-white text-green-400' : ''
            }`}
          >
            Login
          </div>
        </Link>
      </div>
      <div className="md:hidden flex justify-center items-center">
        {/* mobile menu button */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
