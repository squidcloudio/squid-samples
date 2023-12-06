import { Dialog } from '@mui/material';
import { useState } from 'react';
import DeleteUser from './DeleteUser.tsx';
import UpdateUser from './UpdateUser.tsx';

type User = { id: string; email: string; age: number };

export default function Options({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}
    >
      <button id="options" onClick={() => setOpen(!open)}>
        ...
      </button>
      <Dialog open={open}>
        <div id="dialogContainer">
          <div id="dialogHeader">User {user.id}</div>
          <UpdateUser id={user.id} setOpen={setOpen} />
          <DeleteUser id={user.id} />
          <button id="close" onClick={() => setOpen(!open)}>
            X
          </button>
        </div>
      </Dialog>
    </div>
  );
}
