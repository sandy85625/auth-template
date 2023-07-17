import React from 'react';

interface CreateNewCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const ItemsCard: React.FC<CreateNewCardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div className="bg-gray-300 p-4 rounded cursor-pointer hover:bg-gray-400" onClick={onClick}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default ItemsCard;
