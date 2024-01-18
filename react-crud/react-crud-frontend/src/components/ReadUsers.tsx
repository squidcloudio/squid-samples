import { useCollection, useQuery } from '@squidcloud/react';
import Options from './Options.tsx';

type User = { id: string; email: string; age: number };

export default function ReadUsers() {
  const collection = useCollection<User>('users');
  /** The list of users will be streamed to the client and kept up-to-date **/
  const users = useQuery(collection.query());

  return (
    <>
      <tr className="tableTitles">
        <th className="colLeft">Email</th>
        <th className="colRight">Age</th>
      </tr>
      <tr style={{ backgroundColor: '#e1e6ef' }}>
        <td colSpan={3}></td>
      </tr>
      {users.data.map((user) => (
        <tr key={user.data.id}>
          <td className="colLeft">{user.data.email}</td>
          <td className="colRight">{user.data.age}</td>
          <td className="colRight">
            <Options user={user.data} />
          </td>
        </tr>
      ))}
    </>
  );
}
