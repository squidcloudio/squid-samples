import React from 'react';

interface TeamListProps {
  redTeamMembers: string[];
  blueTeamMembers: string[];
  playerName: string;
  redMaster: string | null;
  blueMaster: string | null;
}

const TeamList: React.FC<TeamListProps> = ({
  redTeamMembers,
  blueTeamMembers,
  playerName,
  redMaster,
  blueMaster,
}) => {
  return (
    <div className="team-list-container">
      <div className="team red-team">
        <h3>Red Team</h3>
        <ul>
          {redTeamMembers.map((member, index) => (
            <li
              key={index}
              className={`red-member ${
                member === playerName ? 'current-user' : ''
              } ${member === redMaster ? 'is-spymaster' : ''}`}
            >
              {member}
            </li>
          ))}
        </ul>
      </div>
      <div className="team blue-team">
        <h3>Blue Team</h3>
        <ul>
          {blueTeamMembers.map((member, index) => (
            <li
              key={index}
              className={`blue-member ${
                member === playerName ? 'current-user' : ''
              } ${member === blueMaster ? 'is-spymaster' : ''}`}
            >
              {member}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamList;
