import React from 'react';
import Head from 'next/head';

const Trending: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <Head>
        <title>Trending | Tickets</title>
      </Head>
      <h1 className="text-6xl font-bold text-white animate-pulse">Coming Soon!</h1>
    </div>
  );
};

export default Trending;
