import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from './board';
import { useCollection, useQuery } from '@squidcloud/react';
import { getRandomWords } from '../utils/wordBank.ts';
import UserModal from './userModal.tsx';
import { DocumentReference } from '@squidcloud/client';
import Card, { CardStatus } from './card.tsx';

type Game = {
  id: string;
  cards: Card[];
  lastAccess: number;  // Allows cleanup of old games.
  blueTeam: string[];
  redTeam: string[];
  blueMaster: string | null;
  redMaster: string | null;
  turn: Team;
}

export enum Team {
  Neutral = 0,
  Red = 1,
  Blue = 2,
  Assassin = 3,
}

function generateCards(size: number = 25): Card[] {
  const words = getRandomWords(size);
  const teamSize = Math.floor(size / 3);
  let states = Array(teamSize + 1).fill(Team.Red);
  states = states.concat(Array(teamSize).fill(Team.Blue));
  states = states.concat(Array(teamSize).fill(Team.Neutral));
  states[size - 1] = Team.Assassin;
  // Shuffle which cards are for which team.
  states.sort(() => 0.5 - Math.random());
  let cards: Card[] = [];
  for (let i = 0; i < words.length; i++) {
    cards.push({ word: words[i], team: states[i], status: CardStatus.Idle })
  }
  return cards;
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
    lastAccess: new Date().getTime(),
    blueTeam: [],
    redTeam: [],
    blueMaster: null,
    redMaster: null,
    turn: Team.Red,
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
    gameData.cards = generateCards();
    gameData.turn = Team.Red;
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
    const curStatus = gameData.cards[wordIndex].status;
    let newStatus = curStatus;
    if (team === Team.Red) {
      if (curStatus === CardStatus.TentativeRed) {
        newStatus = CardStatus.Idle;
      } else if (curStatus === CardStatus.TentativeBlue) {
        newStatus = CardStatus.TentativeBoth;
      } else if (curStatus === CardStatus.TentativeBoth) {
        newStatus = CardStatus.TentativeBlue;
      } else if (curStatus === CardStatus.Idle) {
        newStatus = CardStatus.TentativeRed;
      }
    } else if (team === Team.Blue) {
      if (curStatus === CardStatus.TentativeBlue) {
        newStatus = CardStatus.Idle;
      } else if (curStatus === CardStatus.TentativeRed) {
        newStatus = CardStatus.TentativeBoth;
      } else if (curStatus === CardStatus.TentativeBoth) {
        newStatus = CardStatus.TentativeRed;
      } else if (curStatus === CardStatus.Idle) {
        newStatus = CardStatus.TentativeBlue;
      }
    }
    if (curStatus !== newStatus) {
      gameData.cards[wordIndex].status = newStatus
      updateGameData(gameRef, gameData).then();
    }
  };

  const handleCardConfirm = (wordIndex: number) => {
    console.log(`Confirm selection of: ${gameData.cards[wordIndex].word}`);
    const team = getTeam();
    if (isSpymaster() || team != gameData.turn) {
      return;
    }
    const card = gameData.cards[wordIndex];
    switch (card.team) {
      case Team.Red:
        card.status = CardStatus.ActuallyRed;
        break;
      case Team.Blue:
        card.status = CardStatus.ActuallyBlue;
        break;
      case Team.Assassin:
        card.status = CardStatus.ActuallyAssassin;
        break;
      default:
        card.status = CardStatus.ActuallyNeutral;
    }
    gameData.cards[wordIndex] = card;
    updateGameData(gameRef, gameData).then();
    if (card.team !== team) {
      handleEndTurn();
    }
  };

  const calculateScore = () => {
    if (gameData === undefined) {
      return {remainRed: 0, remainBlue: 0};
    }
    let remainRed = 0;
    let remainBlue = 0;
    for (let i = 0; i < gameData.cards.length; i++) {
      const state = gameData.cards[i].team;
      const status = gameData.cards[i].status;
      if (state == Team.Red && status != CardStatus.ActuallyRed) {
        remainRed += 1;
      }
      else if (state == Team.Blue && status != CardStatus.ActuallyBlue) {
        remainBlue += 1;
      }
    }
    return {remainRed, remainBlue};
  }

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
    if (team === Team.Blue && gameData.blueMaster) {
      return false;
    }
    return !(team === Team.Red && gameData.redMaster);
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

  const handleEndTurn = () => {
    if (gameData.turn === Team.Red) {
      gameData.turn = Team.Blue;
    } else {
      gameData.turn = Team.Red;
    }
    updateGameData(gameRef, gameData).then();
  };

  const { remainRed, remainBlue } = calculateScore();

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
      <div className="top-bar">
        <div className="spymasters no-pad">
          <div>Spymasters:</div>
          {canBecomeSpymaster(Team.Red) ? (
            <button className="red" onClick={() => handleBecomeSpymaster()}>
              Become Spymaster
            </button>
          ) : (
            <div className="red">{gameData.redMaster || '???'}</div>
          )}
          {canBecomeSpymaster(Team.Blue) ? (
            <button className="blue" onClick={() => handleBecomeSpymaster()}>
              Become Spymaster
            </button>
          ) : (
            <div className="blue">{gameData.blueMaster || '???'}</div>
          )}
        </div>
        <div className="score no-pad">
          <div className="red">{remainRed}</div>
          <div>-</div>
          <div className="blue">{remainBlue}</div>
        </div>
        <button onClick={handleEndTurn} disabled={gameData.turn !== getTeam()}>End Turn</button>
      </div>
      <Board cards={gameData?.cards || []} playerTeam={getTeam()} isSpymaster={isSpymaster()} activeTurn={gameData?.turn} onCardClick={handleCardClick} onCardConfirm={handleCardConfirm} />
    </div>
  );
};

export default Game;
