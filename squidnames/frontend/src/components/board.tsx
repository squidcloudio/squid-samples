import React from 'react';
import Card from './card.tsx';
import { Team } from './game.tsx';

// Define the props for the Board component
interface BoardProps {
  cards: Card[]; // Array of cards to be displayed on the board
  playerTeam: Team;
  isSpymaster: boolean;
  onCardClick: (index: number) => void;
  onCardConfirm: (index: number) => void;
}

// Board component
const Board: React.FC<BoardProps> = ({ cards, playerTeam, isSpymaster,onCardClick, onCardConfirm }) => {
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
          return <Card key={index} card={cards[index]} playerTeam={playerTeam} isSpymaster={isSpymaster} onClick={() => onCardClick(index)}
                       onConfirm={() => onCardConfirm(index)} />;
        }),
      )}
    </div>
  );
};

export default Board;
