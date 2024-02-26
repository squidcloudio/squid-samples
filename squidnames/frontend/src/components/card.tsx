import React, { useEffect, useState } from 'react';
import { CardState, CardStatus, Team } from 'common/common-types';

interface CardProps {
  card: CardState;
  playerTeam: Team;
  isSpymaster: boolean;
  activeTurn: Team;
  onClick: () => void;
  onConfirm: () => void;
}

const Card: React.FC<CardProps> = ({
  card,
  playerTeam,
  isSpymaster,
  activeTurn,
  onClick,
  onConfirm,
}) => {
  const isTentative = [
    CardStatus.TentativeBlue,
    CardStatus.TentativeRed,
    CardStatus.TentativeBoth,
  ].includes(card.status);
  const isActual = [
    CardStatus.ActuallyBlue,
    CardStatus.ActuallyRed,
    CardStatus.ActuallyNeutral,
    CardStatus.ActuallyAssassin,
  ].includes(card.status);
  const isGameOver = activeTurn === Team.Neutral; // Using Neutral to mean game over.
  const isFinished = isGameOver || isActual;
  let isPlayerTentative =
    card.status === CardStatus.TentativeBoth ||
    (card.status === CardStatus.TentativeBlue && playerTeam === Team.Blue) ||
    (card.status === CardStatus.TentativeRed && playerTeam === Team.Red);
  let isConfirmable =
    !isSpymaster && isPlayerTentative && playerTeam === activeTurn;
  let reveal = isSpymaster;

  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Disable the confirm button for a short time after the button is displayed.
  // Prevents accidentally clicking the button when it suddenly appears due to a teammate.
  useEffect(() => {
    if (isConfirmable) {
      const timer = setTimeout(() => {
        setButtonDisabled(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setButtonDisabled(true);
    }
  }, [isConfirmable]);

  let classBuilder: Set<string> = new Set(['word-card']);
  if (isSpymaster) {
    classBuilder.add('spymaster');
  } else {
    classBuilder.add('player');
  }
  if (isTentative) {
    classBuilder.add('tentative');
  }
  if (isActual) {
    classBuilder.add('actual');
  }

  switch (card.status) {
    case CardStatus.TentativeBlue:
      if (isGameOver) {
        break;
      }
      classBuilder.add('guess-blue');
      isConfirmable &&= playerTeam === Team.Blue;
      break;
    case CardStatus.TentativeRed:
      if (isGameOver) {
        break;
      }
      classBuilder.add('guess-red');
      isConfirmable &&= playerTeam === Team.Red;
      break;
    case CardStatus.TentativeBoth:
      if (isGameOver) {
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
      reveal ||= isGameOver;
      break;
  }

  if (reveal && !isActual) {
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
  };

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
        <div className="card-actions">
          <button onClick={handleConfirmClick} disabled={buttonDisabled}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
