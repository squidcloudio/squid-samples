import { getSquidOptions } from '@/utils/squid';
import { Note } from '@/utils/types';
import { NoteList } from '@/components/NoteList';
// Add Squid functionality
import { Squid } from '@squidcloud/client';
import { withServerQuery } from '@squidcloud/react';

export default function Home() {
  const squid = Squid.getInstance(getSquidOptions());
  const Notes = withServerQuery(
    NoteList,
    squid
      .collection<Note>('notes')
      .query()
      .sortBy('timestamp', false)
      .dereference()
  );
  return <Notes />;
}
