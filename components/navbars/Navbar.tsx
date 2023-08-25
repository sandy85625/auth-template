import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { readProfileData } from '../../api/profile';
import { ProfileData } from '../../interfaces';

const CombinedNavbar: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const { user, logout } = useAuth();
  const hasFetchedProfile = useRef(false);

  useEffect(() => {
    if (user && !hasFetchedProfile.current) {
      readProfileData(user)
        .then(profileData => {
          setProfile(profileData);
          hasFetchedProfile.current = true;
        })
        .catch(setErrorMessage);
    }
  }, [user]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const linkData = profile?.role === 'admin' ? [
    { href: '/admin', label: 'Admin', description: '',  status: true },
    { href: '/collections', label: 'Published', description: '',  status: true },
    { href: '/admin/collections', label: 'Collections', description: '',  status: true },
    { href: '/admin/datasets', label: 'Datasets', description: '',  status: true },
    { href: '/admin/analytics', label: 'Analytics', description: '',  status: true },
    { href: '/admin/reports', label: 'Reports', description: '',  status: true },
    { href: '/admin/settings', label: 'Settings', description: '',  status: true },
  ] : [
    { href: '/', label: 'Home', description: '',  status: true },
    { href: '/collections', label: 'Collections', description: '',  status: true },
    { href: '/trending', label: 'Trending', description: '',  status: true }
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLinkClick = (href: string) => {
    toggleMobileMenu();
    router.push(href);
  };
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-4 px-6 md:flex-row md:justify-between">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={100} height={25} />
        </Link>
        <div className="hidden md:flex flex-row ml-4 space-x-4">
          {linkData.filter(link => link.status).map((link) => (
            <Link href={link.href} key={link.href}>
              <div className={`hover:bg-white hover:text-green-400 transition-colors px-4 py-2 rounded-md ${router.pathname === link.href ? 'bg-white text-green-400' : ''}`} title={link.description}>
                {link.label}
              </div>
            </Link>
          ))}
        </div>
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
      </div>

      {isMobileMenuOpen && (
        <div onClick={toggleMobileMenu} className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white rounded-lg p-6 w-4/5 md:w-2/5">
            {linkData.filter(link => link.status).map((link) => (
              <div 
                onClick={() => handleLinkClick(link.href)} 
                key={link.href} 
                className={`text-black hover:bg-blue-200 active:bg-blue-200 hover:text-green-400 active:text-green-400 transition-colors px-4 py-2 rounded-md ${router.pathname === link.href ? 'bg-white text-green-400' : ''}`}
                title={link.description}
              >
                {link.label}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center space-x-4">
        {user && profile !== null ? (
          <div className="flex items-center">
            <button className="focus:outline-none" onClick={toggleDropdown}>
            <img 
              className="h-12 w-12 rounded-full cursor-pointer" 
              src={user.photoURL || '/placeholder.jpg'} 
              alt="Profile Photo" 
              onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/placeholder.jpg";
              }}
          />
            </button>
            {isDropdownOpen && (
              <div onClick={toggleDropdown} className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-40">
                <div className='bg-white p-4 text-base md:text-xl text-black rounded-lg shadow-lg w-56 md:w-64 border border-gray-200 divide-y divide-gray-200'>
                    <button
                        className="px-2 py-2 w-full text-left hover:bg-gray-100 transition ease-in-out duration-150"
                        onClick={handleProfile}
                        type="button"
                    >
                        Profile
                    </button>
                    <hr />
                    <button
                        className="px-2 py-2 w-full text-left hover:bg-gray-100 transition ease-in-out duration-150"
                        onClick={handleLogout}
                        type="button"
                    >
                        Logout
                    </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <div className={`px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors bg-white text-green-400`}>
              Login
            </div>
          </Link>
        )}
      </div>
    </nav>
);
};

export default CombinedNavbar;
