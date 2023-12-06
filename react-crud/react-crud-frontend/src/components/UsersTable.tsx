import CreateUser from './CreateUser.tsx';
import ReadUsers from './ReadUsers.tsx';

export default function UsersTable() {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ fontSize: '1.2em' }} className="colLeft">
            Crew Members
          </th>
          <th colSpan={2}>
            <CreateUser />
          </th>
        </tr>
      </thead>
      <ReadUsers />
    </table>
  );
}
