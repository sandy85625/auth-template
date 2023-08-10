import React, { useState } from 'react';
import { CreateNewCardProps } from '../../../interfaces';

const ProgramCard: React.FC<CreateNewCardProps> = ({
  title,
  description,
  onShowInterestClick,
  onClick,
}) => {
  const [showInterest, setShowInterest] = useState<string>('I am Interested!');

  const handleShowInterestClick = async (event: React.MouseEvent) => {
    // Prevent the click event from propagating up to the parent
    event.stopPropagation();
    // Call the parent's onShowInterestClick function
    if(onShowInterestClick){
      await onShowInterestClick();

      // Update the local state to reflect that the user has shown interest
      setShowInterest('Interest Given');
    }
  };

  return (
    <div 
      className="p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white cursor-pointer"
      onClick={onClick}
    >
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">{title}</h2>
        <p className="text-sm md:text-base lg:text-lg mb-4">{description}</p>
        <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out' 
            onClick={handleShowInterestClick}>
            {showInterest}
        </button>
    </div>

  );
};

export default ProgramCard;
