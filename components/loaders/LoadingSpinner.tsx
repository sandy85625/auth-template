import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="p-12 flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

export default LoadingSpinner;
