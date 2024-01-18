import React, { Dispatch, SetStateAction } from 'react';
import { useCollection, useQuery } from '@squidcloud/react';

type User = { id: string; email: string; age: number };
type EventObj = { value: string }; // Used for form event data access

export default function UpdateUser({
  id,
  setOpen,
}: {
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const collection = useCollection<User>('users');
  const users = useQuery(collection.query());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Find the user with the matching id
    const user = users.data.find((user) => user.data.id == id);

    if (user) {
      user
        .update({
          age: Number((e.target as unknown as Array<EventObj>)[0].value),
        })
        .then(() => console.log('User updated successfully'))
        .catch((error) => console.error('Failed to update user', error));
    }

    setOpen(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <input id="age" type="number" placeholder="Age" />
      <input type="submit" value="Update age" />
    </form>
  );
}
