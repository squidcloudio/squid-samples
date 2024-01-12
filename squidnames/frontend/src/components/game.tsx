import React from 'react';
import { useParams } from 'react-router-dom';
import Board from './board'; // Import your Board component

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>(); // Get the gameId from the URL

  // Temporary words array for the Board component
  const words = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Icaco',
    'Jackfruit',
    'Kiwi',
    'Lemon',
    'Mango',
    'Nectarine',
    'Olive',
    'Papaya',
    'Quince',
    'Raspberry',
    'Strawberry',
    'Tomato',
    'Ugli',
    'Vanilla',
    'Watermelon',
    'Xigua',
    'Yuzu',
  ]; // Add your 25 words here

  return (
    <div>
      <h2>Game ID: {gameId}</h2>
      <Board words={words} />
    </div>
  );
};

export default Game;
