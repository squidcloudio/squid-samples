import CelebrationIcon from '@mui/icons-material/Celebration';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import React from 'react';

interface ApiKeyProps {
  text: string;
}

export enum StatusStates {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Valid = 'VALID',
  Invalid = 'INVALID',
}

interface StatusProps {
  status: StatusStates;
}

function obfuscateText(
  text: string,
  visibleStart = 5,
  hiddenLen = 16,
  visibleEnd = 2,
) {
  if (text.length <= visibleStart) {
    return text;
  }
  return (
    text.slice(0, visibleStart) +
    '*'.repeat(hiddenLen) +
    text.slice(-visibleEnd)
  );
}

export const ApiKeyDisplay: React.FC<ApiKeyProps> = ({ text }) => {
  const transformedText = obfuscateText(text);

  return <div className="key-text text">{transformedText}</div>;
};

export const ValidationStatus: React.FC<StatusProps> = ({ status }) => {
  switch (status) {
    case StatusStates.Valid:
      return (
        <div className="status-box happy-color text">
          <CelebrationIcon />
          <span>Valid!</span>
        </div>
      );
    case StatusStates.Invalid:
      return (
        <div className="status-box sad-color text">
          <ErrorIcon />
          <span>Not valid</span>
        </div>
      );
    case StatusStates.Loading:
      return (
        <div className="status-box text">
          <HourglassTopIcon />
          <span>Checking...</span>
        </div>
      );
    default:
      return <div className="status-box" />;
  }
};
