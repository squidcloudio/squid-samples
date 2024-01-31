import React from 'react';
import Card from './card.tsx';
import { CardState, Team } from 'common/common-types';

// Define the props for the Board component
interface BoardProps {
  cards: CardState[]; // Array of cards to be displayed on the board
  playerTeam: Team;
  isSpymaster: boolean;
  activeTurn: Team;
  onCardClick: (index: number) => void;
  onCardConfirm: (index: number) => void;
}

// Board component
const Board: React.FC<BoardProps> = ({
  cards,
  playerTeam,
  isSpymaster,
  activeTurn,
  onCardClick,
  onCardConfirm,
}) => {
  // Creating a 5x5 grid
  const gridSize = 5;

  return (
    <div
      className="board-grid"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            card={card}
            playerTeam={playerTeam}
            isSpymaster={isSpymaster}
            activeTurn={activeTurn}
            onClick={() => onCardClick(index)}
            onConfirm={() => onCardConfirm(index)}
          />
        );
      })}
    </div>
  );
};

export default Board;
