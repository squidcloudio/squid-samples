import React from 'react';
import { useParams } from 'react-router-dom';
import Board from './board';
import { useCollection, useDoc } from '@squidcloud/react';
import { getRandomWords } from '../utils/wordBank.ts';

type Game = {
  id: string;
  words: string[];
  lastAccess: number;  // Allows cleanup of old games.
  blueTeam: string[];
  redTeam: string[];
}

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>(); // Get the gameId from the URL

  if (!gameId) {
    return "Invalid gameId";
  }

  const gameCollection = useCollection<Game>('games');
  const gameRef = gameCollection.doc(gameId)
  const { data, loading } = useDoc(gameRef);

  if (loading) {
    return "Loading...";
  }

  let words: string[];

  if (data === undefined) {
    // Is a new game, generate a new deck.
    words = getRandomWords();
    const newGame = {
      id: gameId,
      words: words,
      lastAccess: new Date().getTime(),
      blueTeam: [],
      redTeam: []
    }
    gameRef.insert(newGame).then(() => {
      console.debug(`Saved words to ${gameId}`);
    }).catch(() => {
      alert(`Unable to save new game!`,)
    })
  } else {
    // Grab existing game data and update the access time.
    const gameData: Game = data;
    words = gameData.words;
    gameData.lastAccess = new Date().getTime()
    gameRef.update(gameData).catch(() => {
      alert(`Unable to save game state!`,)
    })
  }

  return (
    <div>
      <h2>Game ID: {gameId}</h2>
      <Board words={words} />
    </div>
  );
};

export default Game;
