'use client';

import { List } from '@mui/material';
import { NoteItem } from '@/components/NoteItem';
import { Note } from '@/utils/types';
import { useRef } from 'react';
import { NoteModal, NoteModalRef } from '@/components//NoteModal';
// Add the Squid Cloud React SDK hooks
import { WithQueryProps, useCollection } from '@squidcloud/react';

export const NoteList = ({ data }: WithQueryProps<Note>) => {
  // Squid notes collection
  const collection = useCollection<Note>('notes');

  // Save the note to the database
  const handleSave = async ({ id, title, content }: Note) => {
    const timestamp = new Date();
    if (id !== '') {
      await collection.doc(id).update({
        title,
        content,
        timestamp,
      });
    } else {
      id = crypto.randomUUID();
      await collection.doc(id).insert({
        id,
        title,
        content,
        timestamp,
      });
    }
  };

  // Delete note from database
  const handleDelete = ({ id }: Note) => collection.doc(id).delete();

  const noteModalRef = useRef<NoteModalRef>(null);

  const handleEdit = (note: Note) => noteModalRef.current?.handleEditNote(note);

  // Add NoteItem components
  return (
    <>
      <NoteModal ref={noteModalRef} onNoteSave={handleSave} />
      <List style={{ padding: '10px 20px' }}>
        {data.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </List>
    </>
  );
};
