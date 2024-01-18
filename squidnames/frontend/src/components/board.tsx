import React from 'react';
import Card from './card.tsx';
import { CardStatus } from './game.tsx';

// Define the props for the Board component
interface BoardProps {
  words: string[]; // Array of words to be displayed on the board
  statuses: CardStatus[]; // Selection statuses of each word
  onCardClick: (index: number) => void;
}

// Board component
const Board: React.FC<BoardProps> = ({ words , statuses, onCardClick }) => {
  // Creating a 5x5 grid
  const gridSize = 5;
  const rows = Array.from({ length: gridSize });

  return (
    <div
      className="boardGrid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '10px',
      }}
    >
      {rows.map((_, rowIndex) =>
        rows.map((_, colIndex) => {
          const index = rowIndex * gridSize + colIndex;
          return <Card key={index} word={words[index]} status={statuses[index]} onClick={() => onCardClick(index)} />;
        }),
      )}
    </div>
  );
};

export default Board;
