import React from 'react';
import { Team } from './game.tsx';

type Card = {
  word: string;
  team: Team;
  status: CardStatus
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

interface CardProps {
  card: Card;
  playerTeam: Team;
  isSpymaster: boolean;
  activeTurn: Team;
  onClick: () => void;
  onConfirm: () => void;
}

const Card: React.FC<CardProps> = ({ card , playerTeam, isSpymaster, activeTurn, onClick, onConfirm }) => {
  const isTentative = [CardStatus.TentativeBlue, CardStatus.TentativeRed, CardStatus.TentativeBoth].includes(card.status);
  const isFinished = [CardStatus.ActuallyBlue, CardStatus.ActuallyRed, CardStatus.ActuallyNeutral, CardStatus.ActuallyAssassin].includes(card.status);
  let isConfirmable = !isSpymaster && isTentative && playerTeam === activeTurn;

  let statusClass: string = 'idle';
  switch (card.status) {
    case CardStatus.TentativeBlue:
      statusClass = 'tentative-blue';
      isConfirmable &&= playerTeam === Team.Blue;
      break;
    case CardStatus.TentativeRed:
      statusClass = 'tentative-red';
      isConfirmable &&= playerTeam === Team.Red;
      break;
    case CardStatus.TentativeBoth:
      statusClass = 'tentative-both';
      break;
    case CardStatus.ActuallyBlue:
      statusClass = 'spymaster-blue';
      break;
    case CardStatus.ActuallyRed:
      statusClass = 'spymaster-red';
      break;
    case CardStatus.ActuallyAssassin:
      statusClass = 'spymaster-assassin';
      break;
    case CardStatus.ActuallyNeutral:
      statusClass = 'actually-neutral';
      break;
  }

  if (isSpymaster) {
    switch (card.team) {
      case Team.Blue:
        statusClass += ' spymaster-blue';
        break;
      case Team.Red:
        statusClass += ' spymaster-red';
        break;
      case Team.Assassin:
        statusClass += ' spymaster-assassin';
        break;
    }
  }

  const handleClick = () => {
    if (isFinished) {
      return;
    }
    onClick();
  }
  const handleConfirmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (playerTeam !== activeTurn) {
      return;
    }
    onConfirm();
  };

  return (
    <div className={`wordCard ${statusClass}`} onClick={handleClick}>
      {card.word}
      {isConfirmable && (
        <div className='card-actions'>
          <button onClick={handleConfirmClick}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default Card;
