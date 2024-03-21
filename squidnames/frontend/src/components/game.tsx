import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from './board';
import { useCollection, useQuery, useSquid } from '@squidcloud/react';
import { getRandomWords } from '../utils/wordBank.ts';
import UserModal from './userModal.tsx';
import { DocumentReference } from '@squidcloud/client';
import TeamList from './teamList.tsx';
import { CardState, CardStatus, GameState, Team } from 'common/common-types';

function generateCards(size: number = 25): CardState[] {
  const words = getRandomWords(size);
  const blueSize = Math.floor(size / 3);
  const redSize = blueSize + 1; // Starting team gets one more card.
  const neutralSize = size - redSize - blueSize - 1; // Subtract 1 assassin.
  let states = [
    ...Array(redSize).fill(Team.Red),
    ...Array(blueSize).fill(Team.Blue),
    ...Array(neutralSize).fill(Team.Neutral),
    Team.Assassin,
  ];
  // Shuffle which cards are for which team.
  states.sort(() => 0.5 - Math.random());
  return words.map((word, i) => {
    return { word, team: states[i], status: CardStatus.Idle };
  });
}

const gameLockSuffix = '_gameLock';

async function updateGameData(
  gameRef: DocumentReference<GameState>,
  gameData: GameState,
): Promise<void> {
  gameData.lastAccess = new Date().getTime();
  try {
    await gameRef.update(gameData);
    console.debug(`Game data updated for ${gameData.id}`);
  } catch (error: any) {
    console.error(`Error updating game data for ${gameData.id}:`, error);
  }
}

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>(); // Get the gameId from the URL
  const [playerName, setPlayerName] = useState<string>('???');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const squid = useSquid();
  const gameCollection = useCollection<GameState>('games');
  const { loading: gameLoading, data: games } = useQuery(
    gameCollection.query().eq('id', gameId!),
    { enabled: !!gameId },
  );
  const gameLockId = gameId! + gameLockSuffix;

  let gameData: GameState = {
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
    // Check if player name is stored in local storage
    const storedName = localStorage.getItem('playerName');
    console.log(`Got stored name: ${storedName}`);
    if (storedName) {
      setPlayerName(storedName);
      setIsModalOpen(
        (gameData &&
          !gameData?.blueTeam.includes(storedName) &&
          !gameData?.redTeam.includes(storedName)) ||
          gameData == undefined,
      );
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

  const gameRef = gameCollection.doc(gameId);

  if (games.length > 1) {
    console.error(`Got more than one matching game for game ID: '${gameId}'`);
    return 'Something strange happened. Please start a new game.';
  } else if (games.length == 0) {
    // Is a new game, generate a new game.
    gameData.cards = generateCards();
    gameData.turn = Team.Red;
    gameRef
      .insert(gameData)
      .then(() => {
        console.debug(`Saved words to ${gameId}`);
      })
      .catch(() => {
        alert(`Unable to save new game!`);
      });
  } else {
    // Update the local game instance.
    gameData = games[0].data;
    console.log('Red spymaster:', gameData.redMaster);
    console.log('Blue spymaster:', gameData.blueMaster);
  }

  const handleModalSubmit = (playerName: string, team: Team) => {
    // Get their previous name, if it exists.
    const oldName = localStorage.getItem('playerName');
    // Save the new name to local storage.
    localStorage.setItem('playerName', playerName);

    if (gameData === undefined) {
      alert('Unable to set player profile for nonexistent game!');
      return;
    }
    setPlayerName(playerName);

    squid
      .withLock(gameLockId, async () => {
        gameData.blueTeam = gameData.blueTeam.filter(
          (name) => name != playerName && name != oldName,
        );
        gameData.redTeam = gameData.redTeam.filter(
          (name) => name != playerName && name != oldName,
        );
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
        return updateGameData(gameRef, gameData);
      })
      .then(() => {
        console.log(`Player added.`);
      })
      .catch((error) => {
        console.error('Failed to add player.', error);
      });
  };

  const handleCardClick = (wordIndex: number) => {
    console.log(`Card clicked: ${gameData.cards[wordIndex].word}`);
    squid
      .withLock(gameLockId, async () => {
        const team = getTeam();
        if (isSpymaster() || team === Team.Neutral) {
          return;
        }
        const redTeamStatusChange = new Map([
          [CardStatus.TentativeRed, CardStatus.Idle],
          [CardStatus.TentativeBlue, CardStatus.TentativeBoth],
          [CardStatus.TentativeBoth, CardStatus.TentativeBlue],
          [CardStatus.Idle, CardStatus.TentativeRed],
        ]);

        const blueTeamStatusChange = new Map([
          [CardStatus.TentativeBlue, CardStatus.Idle],
          [CardStatus.TentativeRed, CardStatus.TentativeBoth],
          [CardStatus.TentativeBoth, CardStatus.TentativeRed],
          [CardStatus.Idle, CardStatus.TentativeBlue],
        ]);
        const curStatus = gameData.cards[wordIndex].status;
        let newStatus = curStatus;
        if (team === Team.Red) {
          newStatus = redTeamStatusChange.get(curStatus) ?? curStatus;
        } else if (team === Team.Blue) {
          newStatus = blueTeamStatusChange.get(curStatus) ?? curStatus;
        }
        if (curStatus !== newStatus) {
          gameData.cards[wordIndex].status = newStatus;
          return updateGameData(gameRef, gameData);
        }
      })
      .then(() => {
        console.log(`Card tentatively selected.`);
      })
      .catch((error: any) => {
        console.error('Failed to tentatively select card.', error);
      });
  };

  const handleCardConfirm = (wordIndex: number) => {
    console.log(`Confirm selection of: ${gameData.cards[wordIndex].word}`);
    squid
      .withLock(gameLockId, async () => {
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
            // Using "Neutral" to mean the game is over.
            gameData.turn = Team.Neutral;
            break;
          default:
            card.status = CardStatus.ActuallyNeutral;
        }
        gameData.cards[wordIndex] = card;

        const { remainRed, remainBlue } = calculateScore();
        if (remainRed === 0 || remainBlue === 0) {
          // Using "Neutral" to mean the game is over.
          gameData.turn = Team.Neutral;
        }
        if (card.team !== team) {
          handleEndTurn();
        }
        return updateGameData(gameRef, gameData);
      })
      .then(() => {
        console.log(`Card selection confirmed.`);
      })
      .catch((error: any) => {
        console.error('Failed to confirm card selection.', error);
      });
  };

  const calculateScore = () => {
    if (gameData === undefined) {
      return { remainRed: 0, remainBlue: 0 };
    }
    let remainRed = 0;
    let remainBlue = 0;
    for (let i = 0; i < gameData.cards.length; i++) {
      const { team, status } = gameData.cards[i];
      if (team == Team.Red && status != CardStatus.ActuallyRed) {
        remainRed += 1;
      } else if (team == Team.Blue && status != CardStatus.ActuallyBlue) {
        remainBlue += 1;
      }
    }
    return { remainRed, remainBlue };
  };

  const getTeam = () => {
    if (gameData?.redTeam.includes(playerName)) {
      return Team.Red;
    } else if (gameData?.blueTeam.includes(playerName)) {
      return Team.Blue;
    }
    return Team.Neutral;
  };

  const isSpymaster = () =>
    gameData?.redMaster === playerName || gameData?.blueMaster === playerName;

  const hasSpymaster = (forTeam: Team) =>
    (forTeam === Team.Blue && gameData.blueMaster) ||
    (forTeam === Team.Red && gameData.redMaster);

  const canBecomeSpymaster = (forTeam: Team) =>
    forTeam === getTeam() && !isSpymaster() && !hasSpymaster(forTeam);

  const handleBecomeSpymaster = () => {
    squid
      .withLock(gameLockId, async () => {
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
        return updateGameData(gameRef, gameData);
      })
      .then(() => {
        console.log(`${playerName} is now Spymaster.`);
      })
      .catch((error: any) => {
        console.error('Failed to assign a spymaster.', error);
      });
  };

  const handleEndTurn = () => {
    squid
      .withLock(gameLockId, async () => {
        if (gameData.turn === Team.Red) {
          gameData.turn = Team.Blue;
        } else if (gameData.turn === Team.Blue) {
          gameData.turn = Team.Red;
        }
        return updateGameData(gameRef, gameData);
      })
      .then(() => {
        console.log(`Successfully ended turn.`);
      })
      .catch((error: any) => {
        console.error('Failed to end turn.', error);
      });
  };

  const handleNewGame = () => {
    squid
      .withLock(gameLockId, async () => {
        // Reset relevant fields while keeping the existing players.
        gameData.turn = Team.Red;
        gameData.redMaster = null;
        gameData.blueMaster = null;
        // Swap team colors.
        const red = gameData.redTeam;
        gameData.redTeam = gameData.blueTeam;
        gameData.blueTeam = red;
        gameData.cards = generateCards();
        return updateGameData(gameRef, gameData);
      })
      .then(() => {
        console.log(`Successfully reset the game.`);
      })
      .catch((error: any) => {
        console.error('Failed to reset the game.', error);
      });
  };

  const { remainRed, remainBlue } = calculateScore();

  return (
    <div>
      <h4>Shareable URL</h4>
      <p>https://squidnames.netlify.app/game/{gameId}</p>
      {isModalOpen && (
        <UserModal isOpen={isModalOpen} onSubmit={handleModalSubmit} />
      )}
      <TeamList
        redTeamMembers={gameData.redTeam}
        blueTeamMembers={gameData.blueTeam}
        playerName={playerName}
        redMaster={gameData.redMaster}
        blueMaster={gameData.blueMaster}
      />
      <div className="top-bar">
        <div className="spymasters no-pad">
          <div>Spymasters:</div>
          {canBecomeSpymaster(Team.Red) ? (
            <button
              className="red-member"
              onClick={() => handleBecomeSpymaster()}
            >
              Become Spymaster
            </button>
          ) : (
            <div className="red-member">{gameData.redMaster || '???'}</div>
          )}
          {canBecomeSpymaster(Team.Blue) ? (
            <button
              className="blue-member"
              onClick={() => handleBecomeSpymaster()}
            >
              Become Spymaster
            </button>
          ) : (
            <div className="blue-member">{gameData.blueMaster || '???'}</div>
          )}
        </div>
        <div className="score no-pad">
          <div className="red-score">{remainRed}</div>
          <div>-</div>
          <div className="blue-score">{remainBlue}</div>
        </div>
        {gameData.turn === Team.Neutral ? (
          <button onClick={handleNewGame}>New Game</button>
        ) : (
          <button
            onClick={handleEndTurn}
            disabled={gameData.turn !== getTeam()}
          >
            End Turn
          </button>
        )}
      </div>
      <Board
        cards={gameData?.cards || []}
        playerTeam={getTeam()}
        isSpymaster={isSpymaster()}
        activeTurn={gameData?.turn}
        onCardClick={handleCardClick}
        onCardConfirm={handleCardConfirm}
      />
    </div>
  );
};

export default Game;
