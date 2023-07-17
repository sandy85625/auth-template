import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

const linkData = [
    { href: '/collections', label: 'Collections' },
    { href: '/dataset', label: 'Datasets' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/reports', label: 'Reports' },
    { href: '/settings', label: 'Settings' },
  ];

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await logout();
    // You can add any additional logic after logging out
  };

  const handleProfile = () => {
    router.push('/profile')
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gray-900 py-4 px-6">
        <div className="w-1/2 flex items-center">
            <Link href='/dashboard'>
                <Image src="/logo.png" alt="Logo" width={100} height={25} />
            </Link>
            <div className="flex flex-row ml-4 space-x-4">
            {linkData.map((link) => (
                <Link href={link.href} key={link.href}>
                <div>
                    <a className="text-white hover:text-gray-400">{link.label}</a>
                </div>
                </Link>
            ))}
            </div>
        </div>
        {user && (
            <div className="w-1/2 flex items-center justify-end">
            <div className="relative">
                <button
                className="focus:outline-none"
                onClick={toggleDropdown}
                onMouseEnter={toggleDropdown}
                >
                <img
                    className="h-12 w-12 rounded-full cursor-pointer"
                    src={user.photoURL || '/placeholder.jpg'}
                    alt="Profile Photo"
                />
                </button>
                {isDropdownOpen && (
                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-2">
                    <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    onClick={handleProfile}
                    >
                    Profile
                    </button>
                    <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    onClick={handleLogout}
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

export default Navbar;
