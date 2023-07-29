import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer: React.FC = () => {
  return (
    <footer className="sticky bottom-0 bg-blue-800 text-white py-6 md:py-8 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <Image src="/logo.png" alt="footer logo" width={100} height={25} className='mb-2' />
          <p className='text-sm md:text-base'>&copy; {new Date().getFullYear()} Evoura Technologies Private Limited</p>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
          {/* <Link href="/about" className='hover:text-blue-200'>About</Link>
          <Link href="/services" className='hover:text-blue-200'>Services</Link> */}
          <Link href="/contact" className='hover:text-blue-200'>Contact Us</Link>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link href="https://twitter.com/evouratech" target="_blank" rel="noopener noreferrer">
            <TwitterIcon fontSize="small" className="cursor-pointer text-white hover:text-blue-200" />
          </Link>
          <Link href="https://www.facebook.com/tickets.evoura" target="_blank" rel="noopener noreferrer">
            <FacebookIcon fontSize="small" className="cursor-pointer text-white hover:text-blue-200" />
          </Link>
          <Link href="https://instagram.com/evouratech" target="_blank" rel="noopener noreferrer">
            <InstagramIcon fontSize="small" className="cursor-pointer text-white hover:text-blue-200" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
