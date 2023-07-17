import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LandingNavbar: React.FC = () => {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';
  const isSignupPage = router.pathname === '/register';

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gray-900 py-4 px-6">
      <div className="w-1/2 flex justify-center items-center">
        <Link href="/">
        <div>
          <a>
            <Image src="/logo.png" alt="Logo" width={100} height={25} />
          </a>
          </div>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Link href="/register">
            <div className='px-2'>
          <a
            className={`hover:bg-gray-200 hover:text-gray-700 px-4 py-2 rounded-md ${
              isSignupPage ? 'text-gray-700 bg-gray-200 text-gray-700' : 'text-white'
            }`}
          >
            Sign Up
          </a>
          </div>
        </Link>
        <Link href="/login">
            <div className='px-2'>
          <a
            className={`hover:bg-gray-200 hover:text-gray-700 px-4 py-2 rounded-md ${
              isLoginPage ? 'text-gray-700 bg-gray-200 text-gray-700' : 'text-white'
            }`}
          >
            Login
          </a>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
