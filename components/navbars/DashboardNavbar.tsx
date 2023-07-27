import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

const linkData = [
  { href: '/collections', label: 'Collections', description: 'All Collections', status: true },
  { href: '/trending', label: 'Trending', description: 'Trending Collections', status: true  },
];

const DashboardNavbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    logout();
    router.push('/login')
  };

  const handleProfile = () => {
    router.push('/profile')
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-4 px-6 md:flex-row md:justify-between">
      <div className="flex items-center justify-between md:justify-start w-full md:w-auto">
        <Link href="/dashboard">
          <Image src="/logo.png" alt="Logo" width={100} height={25} />
        </Link>
        <div className={`md:hidden ${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col space-y-4 py-2 absolute w-full left-0 top-full bg-gray-800`}>
          {linkData.filter(link => link.status).map((link) => (
            <Link href={link.href} key={link.href}>
              <div className={`hover:bg-white hover:text-green-400 transition-colors px-4 py-2 rounded-md ${router.pathname === link.href ? 'bg-white text-green-400' : ''}`} title={link.description}>
                {link.label}
              </div>
            </Link>
          ))}
        </div>
        <div className="hidden md:flex flex-row ml-4 space-x-4">
          {linkData.filter(link => link.status).map((link) => (
            <Link href={link.href} key={link.href}>
              <div className={`hover:bg-white hover:text-green-400 transition-colors px-4 py-2 rounded-md ${router.pathname === link.href ? 'bg-white text-green-400' : ''}`} title={link.description}>
                {link.label}
              </div>
            </Link>
          ))}
        </div>
        <div className="md:hidden flex items-center space-x-4">
          {/* mobile menu button */}
          <button className="mobile-menu-button" onClick={toggleMobileMenu} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-white"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {user && (
            <div className="relative">
              <button
                className="focus:outline-none"
                onClick={toggleDropdown}
                type="button"
              >
                <img
                  className="h-8 w-8 rounded-full cursor-pointer"
                  src={user.photoURL || '/placeholder.jpg'}
                  alt="Profile Photo"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-2 border-2 border-gray-200 text-gray-800">
                  <button
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                    onClick={handleProfile}
                    type="button"
                  >
                    Profile
                  </button>
                  <hr />
                  <button
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                    onClick={handleLogout}
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {user && (
        <div className="hidden md:flex items-center">
          <div className="relative">
            <button
              className="focus:outline-none"
              onClick={toggleDropdown}
              onMouseEnter={toggleDropdown}
              type="button"
            >
              <img
                className="h-12 w-12 rounded-full cursor-pointer"
                src={user.photoURL || '/placeholder.jpg'}
                alt="Profile Photo"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-2 border-2 border-gray-200 text-gray-800">
                <button
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  onClick={handleProfile}
                  type="button"
                >
                  Profile
                </button>
                <hr />
                <button
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
