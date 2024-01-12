import React from 'react';

// Define the props for the Card component
interface CardProps {
  word: string;
}

// Card component
const Card: React.FC<CardProps> = ({ word }) => {
  return (
    <div
      className="wordCard"
      style={{
        border: '1px solid black',
        padding: '10px',
        textAlign: 'center',
      }}
    >
      {word}
    </div>
  );
};

export default Card;
