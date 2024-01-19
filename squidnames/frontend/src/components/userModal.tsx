import React, { useState } from 'react';
import { Team } from './game.tsx';

interface UserModalProps {
  isOpen: boolean;
  onSubmit: (displayName: string, team: Team) => void;
  redTeamMembers: string[];
  blueTeamMembers: string[];
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onSubmit, redTeamMembers, blueTeamMembers }) => {
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
    <div className='userModal'>
      <h2>Enter your name and choose a team</h2>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Your player name"
      />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div onClick={() => handleSubmit(Team.Red)} style={{ cursor: 'pointer', border: '1px solid red' }}>
          <h3>Red Team</h3>
          <div>
            {redTeamMembers.map(member => <p key={member}>{member}</p>)}
          </div>
        </div>
        <div onClick={() => handleSubmit(Team.Blue)} style={{ cursor: 'pointer', border: '1px solid blue' }}>
          <h3>Blue Team</h3>
          <div>
            {blueTeamMembers.map(member => <p key={member}>{member}</p>)}
          </div>
        </div>
      </div>
      {/*<button onClick={onClose}>Confirm</button>*/}
    </div>
  );
};

export default UserModal;
