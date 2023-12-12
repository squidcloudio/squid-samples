import { Poll, State } from '@/common/common-types';
import { useCollection, useQuery } from '@squidcloud/react';
import { groupBy } from 'lodash';
import PollCard from '@/components/PollCard';
import { Fragment } from 'react';

export default function AllPolls() {
  const stateToHeader: [State, string, any][] = [
    ['active', 'Active', PollCard],
    ['expired', 'Ended', PollCard],
  ];

  const pollsCollection = useCollection<Poll>('polls');
  const { data: polls } = useQuery(pollsCollection.query(), true);
  const pollsByState = groupBy(polls, (p) => p.data.state);

  return (
    <div className="all_polls">
      <h1>All polls</h1>
      {stateToHeader.map(([state, header]) => {
        return (
          <Fragment key={state}>
            <h2>{header}</h2>
            {(pollsByState[state] ?? []).map((p) => (
              <PollCard key={p.data.__id} poll={p} />
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}
