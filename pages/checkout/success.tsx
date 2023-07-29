import React from 'react';
import Link from 'next/link';

const Success: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="max-w-md mx-auto px-6 py-8 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-3xl font-semibold mb-6 text-green-500">Success!</h2>
        <p className="text-gray-600 mb-8">Your payment was successful.</p>
        <Link href="/">
          <div className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">
            Explore more rewards! Let's go home!
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Success;
