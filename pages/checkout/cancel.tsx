import React from 'react';
import Link from 'next/link';

const Cancel: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-400 to-pink-500">
      <h1 className="text-4xl font-bold text-red-800 mb-8">Payment Cancelled</h1>
      <p className="text-lg text-white mb-12 text-center max-w-md">
        We&apos;re sorry, but your payment has been cancelled. Please try again.
      </p>
      <Link href="/home">
        <div className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Go back to Home
        </div>
      </Link>
    </div>
  );
};

export default Cancel;
