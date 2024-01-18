import React from 'react';
import { CardStatus } from './game.tsx';

interface CardProps {
  word: string;
  status: CardStatus;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ word , status, onClick }) => {
  return (
    <div className={`wordCard ${status}`} onClick={onClick}>
      {word}
    </div>
  );
};

export default Card;
