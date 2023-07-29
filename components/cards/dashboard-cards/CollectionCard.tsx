import React from 'react';
import { CreateNewCardProps } from '../../../interfaces';

const CollectionCard: React.FC<CreateNewCardProps> = ({
  title,
  description,
  price,
  onClick,
}) => {
  return (
    <div 
      className="p-6 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">{title}</h2>
      <p className="text-base md:text-lg mb-4">{description}</p>
      <div className="flex flex-row justify-between items-center">
        <p className="text-sm md:text-base text-blue-200">Base Price: {price}</p>
      </div>
    </div>
  );
};

export default CollectionCard;
