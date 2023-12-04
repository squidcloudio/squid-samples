import CreateUser from './CreateUser.tsx';
import ReadUsers from './ReadUsers.tsx';

export default function UsersTable() {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ fontSize: '24px' }}>Crew Members</th>
          <th>
            <CreateUser />
          </th>
        </tr>
      </thead>
      <ReadUsers />
    </table>
  );
}
