import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

const linkData = [
    { href: '/admin', label: 'Admin', description: 'Admin Dashboard', status: true },
    { href: '/collections', label: 'Published', description: 'Live Collections', status: true },
    { href: '/admin/collections', label: 'Collections', description: 'Create new collection', status: true },
    { href: '/admin/datasets', label: 'Datasets', description: 'View/Add datasets', status: true  },
    { href: '/admin/analytics', label: 'Analytics', description: 'Not available at the moment!', status: true  },
    { href: '/admin/reports', label: 'Reports', description: 'Not available at the moment!', status: true  },
    { href: '/admin/settings', label: 'Settings', description: 'Not available at the moment!', status: false  },
  ];

const AdminNavbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    logout();
    // You can add any additional logic after logging out
  };

  const handleProfile = () => {
    router.push('/profile')
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gray-900 py-4 px-6">
        <div className="w-1/2 flex items-center">
            <Link href='/home'>
                <Image src="/logo.png" alt="Logo" width={100} height={25} />
            </Link>
            <div className="flex flex-row ml-4 space-x-4">
            {linkData.filter(link => link.status).map((link) => (
                <Link href={link.href} key={link.href}>
                <div className={`hover:bg-gray-200 hover:text-gray-700 px-4 py-2 rounded-md ${router.pathname === link.href ? 'text-gray-700 bg-gray-200 text-gray-700' : 'text-white'}`} title={link.description}>
                  {link.label}
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
                  <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-2 border-2 border-gray-200">
                      <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      onClick={handleProfile}
                      >
                      Profile
                      </button>
                      <hr />
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

export default AdminNavbar;
