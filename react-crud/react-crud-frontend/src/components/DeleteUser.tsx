import { useCollection, useQuery } from '@squidcloud/react';

type User = { id: string; email: string; age: number };

export default function DeleteUser({ id }: { id: string }) {
  const collection = useCollection<User>('users');
  const users = useQuery(collection.query());

  const onClick = () => {
    // Find the user with the matching id
    const user = users.data.find((user) => user.data.id == id);

    if (user) {
      user
        .delete()
        .then(() => console.log(`User ${id} deleted`))
        .catch((error) => console.error('Failed to delete user', error));
    }
  };

  return (
    <button id="delete" onClick={onClick}>
      Delete user
    </button>
  );
}
