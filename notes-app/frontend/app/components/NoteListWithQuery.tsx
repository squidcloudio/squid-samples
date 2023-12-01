import { getSquidOptions } from '@/utils/squid';
import { Note } from '@/utils/types';
import { Squid } from '@squidcloud/client';
import { withServerQuery } from '@squidcloud/react';
import { NoteList } from '@/components/NoteList';

export default function NoteListWithQuery() {
  const squid = Squid.getInstance(getSquidOptions());
  const Notes = withServerQuery(
    NoteList,
    squid
      .collection<Note>('notes')
      .query()
      .sortBy('timestamp', false)
      .dereference(),
    true
  );
  return <Notes />;
}
