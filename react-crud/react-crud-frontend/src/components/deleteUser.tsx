import React from 'react';
import { useCollection, useQuery } from '@squidcloud/react';

type User = { id: string; email: string; age: number };
type EventObj = { value: string }; // Used for form event data access

export default function DeleteUser() {
  const collection = useCollection<User>('users');
  const users = useQuery(collection.query(), true /* subscribe */);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Find the first user with the matching email
    const user = users.data.find(
      (user) =>
        user.data.email == (e.target as unknown as Array<EventObj>)[0].value
    );

    if (user) {
      const id = user.data.id;
      user
        .delete()
        .then(() => console.log(`User ${id} deleted`))
        .catch((error) => console.error('Failed to delete user', error));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email: </label>
      <input id="email" />
      <input type="submit" value="Delete user" />
    </form>
  );
}
