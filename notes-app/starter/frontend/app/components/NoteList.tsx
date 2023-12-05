'use client';

import { List } from '@mui/material';
import { NoteItem } from '@/components/NoteItem';
import { Note } from '@/utils/types';
import { useRef } from 'react';
import { NoteModal, NoteModalRef } from '@/components//NoteModal';\
// Add the Squid Cloud React SDK hooks

export const NoteList = () => {
  // Squid notes colleciton

  // Save the note to the database
  const handleSave = async ({ id, title, content }: Note) => {
    console.log('handleSave');
  };

  // Delete the note from the database
  const noteModalRef = useRef<NoteModalRef>(null);

  const handleEditNote = (note: Note) =>
    noteModalRef.current?.handleNoteEdit(note);

    // Add NoteItem components
  return (
    <>
      <NoteModal ref={noteModalRef} onNoteSave={handleSave} />
    </>
  );
};
