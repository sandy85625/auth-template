import React from 'react';
import { CreateNewCardProps } from '../../../interfaces';

const ItemsCard: React.FC<CreateNewCardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <>
    { title && description &&
    <div 
        className="p-6 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white cursor-pointer" 
        onClick={onClick}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
    }
</>

  );
};

export default ItemsCard;
