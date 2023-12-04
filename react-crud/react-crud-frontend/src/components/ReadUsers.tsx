import { useCollection, useQuery } from '@squidcloud/react';
import Options from './Options.tsx';

type User = { id: string; email: string; age: number };

export default function ReadUsers() {
  const collection = useCollection<User>('users');
  /** The list of users will be streamed to the client and kept up-to-date **/
  const users = useQuery(collection.query(), true /* subscribe */);

  return (
    <>
      <tr>
        <th>Email</th>
        <th>Age</th>
      </tr>

      {users.data.map((user) => (
        <tr key={user.data.id}>
          <td>{user.data.email}</td>
          <td>{user.data.age}</td>
          <td>
            <Options user={user.data} />
          </td>
        </tr>
      ))}
    </>
  );
}
