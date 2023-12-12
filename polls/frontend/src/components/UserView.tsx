import '../styles/globals.scss';
import { Poll } from '@/common/common-types';
import { useState } from 'react';
import { useCollection, useQuery } from '@squidcloud/react';
import RespondToPoll from '@/components/RespondToPoll';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '@/components/Layout';

export default function UserView() {
  const pollsCollection = useCollection<Poll>('polls');
  const { data: polls } = useQuery(
    pollsCollection.query().eq('state', 'active').dereference(),
    true,
  );
  const { user, loginWithRedirect } = useAuth0();
  const [activePoll, setActivePoll] = useState<Poll>();

  if (!user) {
    return (
      <button className="login" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    );
  }

  return (
    <Layout className="">
      <div className="active_polls">
        <h1>Active polls</h1>
        {polls.map((p) => (
          <div
            key={p.__id}
            className={'poll' + (activePoll === p ? ' selected' : '')}
            onClick={() => setActivePoll(p)}
          >
            {p.name}
          </div>
        ))}
      </div>
      {activePoll && polls.find((p) => p.__id === activePoll.__id) && (
        <RespondToPoll poll={activePoll} />
      )}
    </Layout>
  );
}
