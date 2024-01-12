import React from 'react';
import Card from './card.tsx';

// Define the props for the Board component
interface BoardProps {
  words: string[]; // Array of words to be displayed on the board
}

// Board component
const Board: React.FC<BoardProps> = ({ words }) => {
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
          const wordIndex = rowIndex * gridSize + colIndex;
          return <Card key={wordIndex} word={words[wordIndex]} />;
        }),
      )}
    </div>
  );
};

export default Board;
