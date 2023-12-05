import React from 'react';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

export enum StatusStates {
  Idle = 'IDLE',
  Sending = 'SENDING',
  Sent = 'SENT',
  Error = 'ERROR',
}

interface StatusProps {
  status: StatusStates;
  message?: string;
}

export const StatusComponent: React.FC<StatusProps> = ({ status, message }) => {
  switch (status) {
    case StatusStates.Sent:
      return (
        <div className="status-box happy-color text">
          <CelebrationIcon />
          <span>Sent!</span>
        </div>
      );
    case StatusStates.Error:
      return (
        <div className="status-box sad-color text">
          <ErrorIcon />
          <span>{message}</span>
        </div>
      );
    case StatusStates.Sending:
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
