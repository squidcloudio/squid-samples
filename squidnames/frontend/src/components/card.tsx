import React from 'react';
import { CardStatus, Team } from './game.tsx';

type Card = {
  word: string;
  state: Team;
}

interface CardProps {
  card: Card;
  status: CardStatus;
  playerTeam: Team;
  isSpymaster: boolean;
  onClick: () => void;
  onConfirm: () => void;
}

const Card: React.FC<CardProps> = ({ card , status, playerTeam, isSpymaster, onClick, onConfirm }) => {
  const isTentative = [CardStatus.TentativeBlue, CardStatus.TentativeRed, CardStatus.TentativeBoth].includes(status);
  const isFinished = [CardStatus.ActuallyBlue, CardStatus.ActuallyRed, CardStatus.ActuallyNeutral, CardStatus.ActuallyAssassin].includes(status);
  let isInteractive = !isSpymaster && isTentative;

  let statusClass: string = 'idle';
  switch (status) {
    case CardStatus.TentativeBlue:
      statusClass = 'tentative-blue';
      isInteractive &&= playerTeam === Team.Blue;
      break;
    case CardStatus.TentativeRed:
      statusClass = 'tentative-red';
      isInteractive &&= playerTeam === Team.Red;
      break;
    case CardStatus.TentativeBoth:
      statusClass = 'tentative-both';
      break;
    case CardStatus.ActuallyBlue:
      statusClass = 'actually-blue';
      break;
    case CardStatus.ActuallyRed:
      statusClass = 'actually-red';
      break;
    case CardStatus.ActuallyAssassin:
      statusClass = 'actually-red';
      break;
    case CardStatus.ActuallyNeutral:
      statusClass = 'actually-neutral';
      break;
  }

  if (isSpymaster) {
    switch (card.state) {
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
    onConfirm();
  };

  return (
    <div className={`wordCard ${statusClass}`} onClick={handleClick}>
      {card.word}
      {isInteractive && (
        <div className='card-actions'>
          <button onClick={handleConfirmClick}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default Card;
