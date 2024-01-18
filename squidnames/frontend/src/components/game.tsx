import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from './board';
import { useCollection, useQuery } from '@squidcloud/react';
import { getRandomWords } from '../utils/wordBank.ts';
import UserModal from './userModal.tsx';
import { DocumentReference } from '@squidcloud/client';
import Card from './card.tsx';

type Game = {
  id: string;
  cards: Card[];
  wordStatuses: CardStatus[];
  lastAccess: number;  // Allows cleanup of old games.
  blueTeam: string[];
  redTeam: string[];
  blueMaster: string | null;
  redMaster: string | null;
}

export enum Team {
  Neutral = 0,
  Red = 1,
  Blue = 2,
  Assassin = 3,
}

export enum CardStatus {
  Idle = 0,
  TentativeBlue = 1,
  TentativeRed = 2,
  TentativeBoth = 3,
  ActuallyRed = 4,
  ActuallyBlue = 5,
  ActuallyNeutral = 6,
  ActuallyAssassin = 7,
}

function generateCards(size: number = 25): Card[] {
  const words = getRandomWords(size);
  const teamSize = Math.floor(size / 3);
  let states = Array(teamSize + 1).fill(Team.Red);
  states = states.concat(Array(teamSize).fill(Team.Blue));
  states = states.concat(Array(teamSize).fill(Team.Neutral));
  states[size - 1] = Team.Assassin;
  states = shuffleArray(states) as Team[]
  let cards: Card[] = [];
  for (let i = 0; i < words.length; i++) {
    cards.push({ word: words[i], state: states[i] })
  }
  return cards;
}

function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

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
    cards: [],
    wordStatuses: [],
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
      cards: generateCards(),
      wordStatuses: Array(25).fill(CardStatus.Idle),
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
      case Team.Red: {
        gameData.redTeam.push(playerName);
        break;
      }
      case Team.Blue: {
        gameData.blueTeam.push(playerName);
        break;
      }
      default: {
        // spectator
      }
    }

    updateGameData(gameRef, gameData).then();
  }

  const handleCardClick = (wordIndex: number) => {
    console.log(`Card clicked: ${gameData.cards[wordIndex].word}`);
    const team = getTeam();
    if (isSpymaster() || team === Team.Neutral) {
      return;
    }
    const curStatus = gameData.wordStatuses[wordIndex];
    if (team === Team.Red) {
      if (curStatus === CardStatus.TentativeRed) {
        gameData.wordStatuses[wordIndex] = CardStatus.Idle;
      } else if (curStatus === CardStatus.TentativeBlue) {
        gameData.wordStatuses[wordIndex] = CardStatus.TentativeBoth;
      } else if (curStatus === CardStatus.TentativeBoth) {
        gameData.wordStatuses[wordIndex] = CardStatus.TentativeBlue;
      } else if (curStatus === CardStatus.Idle) {
        gameData.wordStatuses[wordIndex] = CardStatus.TentativeRed;
      }
    } else if (team === Team.Blue) {
      if (curStatus === CardStatus.TentativeBlue) {
        gameData.wordStatuses[wordIndex] = CardStatus.Idle;
      } else if (curStatus === CardStatus.TentativeRed) {
        gameData.wordStatuses[wordIndex] = CardStatus.TentativeBoth;
      } else if (curStatus === CardStatus.TentativeBoth) {
        gameData.wordStatuses[wordIndex] = CardStatus.TentativeRed;
      } else if (curStatus === CardStatus.Idle) {
        gameData.wordStatuses[wordIndex] = CardStatus.TentativeBlue;
      }
    }
    updateGameData(gameRef, gameData).then();
  };

  // const handleCardCancel = (wordIndex: number) => {
  //   console.log(`Cancel selection of: #${wordIndex}, ${gameData.words[wordIndex]}`);
  //   if (gameData.redMaster === playerName || gameData.blueMaster === playerName) {
  //     return;
  //   }
  //   if (gameData.redTeam.includes(playerName)) {
  //     if (gameData.wordStatuses[wordIndex] === CardStatus.TentativeBoth) {
  //       gameData.wordStatuses[wordIndex] = CardStatus.TentativeBlue;
  //     } else {
  //       gameData.wordStatuses[wordIndex] = CardStatus.Idle;
  //     }
  //   } else if (gameData.blueTeam.includes(playerName)) {
  //     if (gameData.wordStatuses[wordIndex] === CardStatus.TentativeBoth) {
  //       gameData.wordStatuses[wordIndex] = CardStatus.TentativeRed;
  //     } else {
  //       gameData.wordStatuses[wordIndex] = CardStatus.Idle;
  //     }
  //   }
  //   updateGameData(gameRef, gameData).then();
  // };

  const handleCardConfirm = (wordIndex: number) => {
    console.log(`Confirm selection of: ${gameData.cards[wordIndex].word}`);
    if (gameData.redMaster === playerName || gameData.blueMaster === playerName) {
      return;
    }
    // Logic to handle confirm action
  };

  const getTeam = () => {
    if (gameData?.redTeam.includes(playerName)) {
      return Team.Red;
    } else if (gameData?.blueTeam.includes(playerName)) {
      return Team.Blue;
    }
    return Team.Neutral;
  }

  const isSpymaster = () => {
    return gameData?.redMaster == playerName || gameData?.blueMaster == playerName;
  }

  const canBecomeSpymaster = (forTeam: Team) => {
    const team = getTeam();
    if (forTeam !== team || isSpymaster()) {
      return false;
    }
    if (team === Team.Blue && gameData.blueMaster !== undefined) {
      return false;
    }
    if (team === Team.Red && gameData.redMaster !== undefined) {
      return false;
    }
    return true;
  };

  const handleBecomeSpymaster = () => {
    const team = getTeam();
    if (!canBecomeSpymaster(team)) {
      return;
    }
    switch (team) {
      case Team.Red:
        gameData.redMaster = playerName;
        break;
      case Team.Blue:
        gameData.blueMaster = playerName;
        break;
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
        {canBecomeSpymaster(Team.Red) ? (
          <button onClick={() => handleBecomeSpymaster()} disabled={!gameData?.redTeam.includes(playerName)}>
            Become Spymaster
          </button>
        ) : (
          gameData.redMaster == playerName ? (<div>You are spymaster</div>) : (<div>Red Spymaster: {gameData.redMaster || 'TBD'}</div>)
        )}
        {canBecomeSpymaster(Team.Blue) ? (
          <button onClick={() => handleBecomeSpymaster()} disabled={!gameData?.blueTeam.includes(playerName)}>
            Become Spymaster
          </button>
        ) : (
          gameData.blueMaster == playerName ? (<div>You are spymaster</div>) : (<div>Blue Spymaster: {gameData.blueMaster || 'TBD'}</div>)
        )}
      </div>
      <Board cards={gameData?.cards || []} statuses={gameData?.wordStatuses} playerTeam={getTeam()} isSpymaster={isSpymaster()} onCardClick={handleCardClick} onCardConfirm={handleCardConfirm} />
    </div>
  );
};

export default Game;
