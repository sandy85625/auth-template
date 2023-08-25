import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Trending: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
        <Head>
            <title>Trending | Tickets</title>
        </Head>
        <div className="flex justify-center items-center self-start mt-1/4 md:mt-1/3 w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-pulse">
                Coming Soon!
            </h1>
        </div>
        <Link href={'/'}>
            <button className="text-lg md:text-xl lg:text-2xl font-bold text-gray-600 bg-white py-2 px-6 rounded hover:bg-blue-700 hover:text-white transition duration-300">
                Return to Home
            </button>
        </Link>
    </div>
  );
};

export default Trending;
