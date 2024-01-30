import React, { useState } from 'react';
import { Team } from 'common/common-types';

interface UserModalProps {
  isOpen: boolean;
  onSubmit: (displayName: string, team: Team) => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onSubmit }) => {
  const playerName = localStorage.getItem('playerName');
  const [displayName, setDisplayName] = useState(playerName ? playerName : '');

  const handleSubmit = (team: Team) => {
    if (displayName === '') {
      return;
    }
    onSubmit(displayName, team);
  };

  if (!isOpen) return null;

  return (
    <div className="userModal">
      <h2>Enter your name and choose a team</h2>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Your player name"
      />
      <div className="team-selection">
        <div onClick={() => handleSubmit(Team.Red)} className="join-red">
          <h3>Join Red</h3>
        </div>
        <div onClick={() => handleSubmit(Team.Blue)} className="join-blue">
          <h3>Join Blue</h3>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
