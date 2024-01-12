import React from 'react';

// Define the props for the Card component
interface CardProps {
  word: string;
}

// Card component
const Card: React.FC<CardProps> = ({ word }) => {
  return (
    <div className="wordCard">
      {word}
    </div>
  );
};

export default Card;
