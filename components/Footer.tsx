import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white py-4 px-8 flex flex-col md:flex-row justify-between items-center mt-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-x-0 md:space-x-2 mb-4 md:mb-0">
        <Image src="/logo.png" alt="footer logo" width={100} height={25} />
        <p>&copy; {new Date().getFullYear()} Evoura Technologies Private Limited</p>
      </div>
      <div className="flex items-center space-x-4">
      <Link href="https://twitter.com/evouratech" target="_blank" rel="noopener noreferrer">
          <TwitterIcon fontSize="small" className="cursor-pointer text-gray-400 hover:text-white" />
        </Link>
        <Link href="https://www.facebook.com/tickets.evoura" target="_blank" rel="noopener noreferrer">
          <FacebookIcon fontSize="small" className="cursor-pointer text-gray-400 hover:text-white" />
        </Link>
        <Link href="https://instagram.com/evouratech" target="_blank" rel="noopener noreferrer">
          <InstagramIcon fontSize="small" className="cursor-pointer text-gray-400 hover:text-white" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer;
