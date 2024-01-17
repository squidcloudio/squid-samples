import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from './board';
import { useCollection, useQuery } from '@squidcloud/react';
import { getRandomWords } from '../utils/wordBank.ts';
import UserModal from './userModal.tsx';
import { DocumentReference } from '@squidcloud/client';

type Game = {
  id: string;
  words: string[];
  lastAccess: number;  // Allows cleanup of old games.
  blueTeam: string[];
  redTeam: string[];
  blueMaster: string | null;
  redMaster: string | null;
}

export type Team = 'red' | 'blue' | 'spectator';

async function updateGameData(gameRef: DocumentReference<Game>, gameData: Game): Promise<void> {
  console.log('In updateGameData');
  gameData.lastAccess = new Date().getTime()
  gameRef.update(gameData).then(() => {
    console.debug(`Game data updated for ${gameData.id}`);
  }).catch((error) => {
    console.error(`Error updating game data for ${gameData.id}:`, error);
  });
}

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>(); // Get the gameId from the URL
  const [playerName, setPlayerName] = useState<string>('???');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const gameCollection = useCollection<Game>('games')
  const { loading: gameLoading, data: games } = useQuery(
    gameCollection
      .query()
      .eq('id', gameId!),
    { enabled: !!gameId }
  );

  let gameData: Game = {
    id: gameId!,
    words: [],
    lastAccess: new Date().getTime(),
    blueTeam: [],
    redTeam: [],
    blueMaster: null,
    redMaster: null,
  };

  useEffect(() => {
    console.log('In useEffect storedName');
    // Check if player name is stored in local storage
    const storedName = localStorage.getItem('playerName');
    console.log(`Got stored name: ${storedName}`);
    if (storedName) {
      setPlayerName(storedName);
      setIsModalOpen(
        gameData
          && (!gameData?.blueTeam.includes(storedName) && !gameData?.redTeam.includes(storedName))
        || gameData == undefined);
    } else {
      setIsModalOpen(true);
    }
  }, [gameData]);

  if (gameLoading) {
    return 'Loading...';
  }

  if (!gameId) {
    return 'Game ID is required!';
  }

  const gameRef = gameCollection.doc(gameId)

  if (games.length > 1) {
    console.error(`Got more than one matching game for game ID: '${gameId}'`);
    return '<div>Something weird happened. Please start a new game.</div>';
  } else if (games.length == 0) {
    // Is a new game, generate a new game.
    gameData = {
      id: gameId,
      words: getRandomWords(),
      lastAccess: new Date().getTime(),
      blueTeam: [],
      redTeam: [],
      blueMaster: null,
      redMaster: null,
    };
    gameRef.insert(gameData).then(() => {
      console.debug(`Saved words to ${gameId}`);
    }).catch(() => {
      alert(`Unable to save new game!`,)
    })
  } else {
    // Update the local game instance.
    gameData = games[0].data;
    console.log("Red spymaster:", gameData.redMaster);
    console.log("Blue spymaster:", gameData.blueMaster);
  }

  const handleUserSubmit = (playerName: string, team: Team) => {
    console.log('In handleUserSubmit');
    // Get their previous name, if it exists.
    const oldName = localStorage.getItem('playerName');
    // Save the new name to local storage.
    localStorage.setItem('playerName', playerName);

    if (gameData === undefined) {
      alert('Unable to set player profile for nonexistent game!')
      return;
    }
    setPlayerName(playerName);
    // TODO: acquireLock(`${gameId}::gameUpdate`).then(())
    gameData.blueTeam = gameData.blueTeam.filter(name => name != playerName && name != oldName)
    gameData.redTeam = gameData.redTeam.filter(name => name != playerName && name != oldName)
    switch (team) {
      case 'red': {
        gameData.redTeam.push(playerName);
        break;
      }
      case 'blue': {
        gameData.blueTeam.push(playerName);
        break;
      }
      default: {
        // ?
      }
    }

    updateGameData(gameRef, gameData).then();
  }

  const canBecomeSpymaster = (team: 'red' | 'blue') => {
    if (team == 'red') {
      return gameData?.redTeam.includes(playerName) && !gameData?.redMaster;
    } else {
      return gameData?.blueTeam.includes(playerName) && !gameData?.blueMaster;
    }
  };

  const handleBecomeSpymaster = () => {
    if (gameData?.blueTeam.includes(playerName)) {
      gameData.blueMaster = playerName;
    } else if (gameData?.redTeam.includes(playerName)) {
      gameData.redMaster = playerName;
    }
    updateGameData(gameRef, gameData).then();
  };

  return (
    <div>
      <h2>Game ID: {gameId}</h2>
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onSubmit={handleUserSubmit}
          redTeamMembers={gameData?.redTeam || []}
          blueTeamMembers={gameData?.blueTeam || []}
        />
      )}
      <h4>Playing as: {playerName}</h4>
      <div className="spymasters">
        {canBecomeSpymaster('red') ? (
          <button onClick={() => handleBecomeSpymaster()} disabled={!gameData?.redTeam.includes(playerName)}>
            Become Spymaster
          </button>
        ) : (
          gameData.redMaster == playerName ? (<div>You are spymaster</div>) : (<div>Red Spymaster: {gameData.redMaster || 'TBD'}</div>)
        )}
        {canBecomeSpymaster('blue') ? (
          <button onClick={() => handleBecomeSpymaster()} disabled={!gameData?.blueTeam.includes(playerName)}>
            Become Spymaster
          </button>
        ) : (
          gameData.blueMaster == playerName ? (<div>You are spymaster</div>) : (<div>Blue Spymaster: {gameData.blueMaster || 'TBD'}</div>)
        )}
      </div>
      <Board words={gameData?.words || []} />
    </div>
  );
};

export default Game;
