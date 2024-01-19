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
  const isActual = [CardStatus.ActuallyBlue, CardStatus.ActuallyRed, CardStatus.ActuallyNeutral, CardStatus.ActuallyAssassin].includes(card.status);
  const isFinished = activeTurn === Team.Neutral || isActual;
  let isConfirmable = !isSpymaster && isTentative && playerTeam === activeTurn;

  let classBuilder: Set<string> = new Set(['wordCard']);
  if (isSpymaster) {
    classBuilder.add('spymaster');
  }
  if (isTentative) {
    classBuilder.add('tentative');
  }
  if (isActual) {
    classBuilder.add('actual');
  }

  switch (card.status) {
    case CardStatus.TentativeBlue:
      // Using "Neutral" to mean the game is over.
      if (activeTurn === Team.Neutral) {
        break;
      }
      classBuilder.add('guess-blue');
      isConfirmable &&= playerTeam === Team.Blue;
      break;
    case CardStatus.TentativeRed:
      // Using "Neutral" to mean the game is over.
      if (activeTurn === Team.Neutral) {
        break;
      }
      classBuilder.add('guess-red');
      // Using "Neutral" to mean the game is over.
      isConfirmable &&= playerTeam === Team.Red;
      break;
    case CardStatus.TentativeBoth:
      if (activeTurn === Team.Neutral) {
        break;
      }
      classBuilder.add('guess-both');
      break;
    case CardStatus.ActuallyBlue:
      classBuilder.add('card-blue');
      break;
    case CardStatus.ActuallyRed:
      classBuilder.add('card-red');
      break;
    case CardStatus.ActuallyAssassin:
      classBuilder.add('card-assassin');
      break;
    case CardStatus.ActuallyNeutral:
      classBuilder.add('card-neutral');
      break;
    case CardStatus.Idle:
      // Using "Neutral" to mean the game is over.
      if (activeTurn !== Team.Neutral) {
        break;
      }
      classBuilder.add('revealed');
      switch (card.team) {
        case Team.Red:
          classBuilder.add('card-red');
          break;
        case Team.Blue:
          classBuilder.add('card-blue');
          break;
        case Team.Assassin:
          classBuilder.add('card-assassin');
          break;
      }

      break;
  }

  if (isSpymaster) {
    classBuilder.add('revealed');
    switch (card.team) {
      case Team.Blue:
        classBuilder.add('card-blue');
        break;
      case Team.Red:
        classBuilder.add('card-red');
        break;
      case Team.Assassin:
        classBuilder.add('card-assassin');
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
    <div className={Array.from(classBuilder).join(' ')} onClick={handleClick}>
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
