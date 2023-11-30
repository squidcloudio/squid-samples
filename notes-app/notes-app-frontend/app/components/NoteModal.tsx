'use client';

import { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal, Box, Typography, TextField, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { OnNoteAction, Note } from '@/utils/types';

export type NoteModalProps = {
  onNoteSave: OnNoteAction;
};

export type NoteModalRef = {
  handleNoteEdit: (note: Note) => void;
};

const emptyNote = (): Note => ({
  id: '',
  title: '',
  content: '',
  timestamp: new Date(),
});

export const NoteModal = forwardRef<NoteModalRef, NoteModalProps>(
  ({ onNoteSave }: NoteModalProps, reference) => {
    const [openModal, setOpenModal] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note>(emptyNote());

    useImperativeHandle<NoteModalRef, NoteModalRef>(reference, () => ({
      handleNoteEdit: (note: Note) => {
        setIsEditingNote(true);
        setCurrentNote(note);
        setOpenModal(true);
      },
    }));

    const handleOpenForNewNote = () => {
      setIsEditingNote(false);
      setCurrentNote(emptyNote());
      setOpenModal(true);
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCurrentNote((previousNote: Note) => ({
        ...previousNote,
        [name]: value,
      }));
    };

    const handleSaveNote = async () => {
      await onNoteSave(currentNote);
      handleCloseModal();
    };

    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      padding: 4,
    };

    return (
      <>
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: 'fixed', right: 20, bottom: 20 }}
          onClick={handleOpenForNewNote}
        >
          <AddIcon />
        </Fab>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              {isEditingNote ? 'Edit' : 'New'} Note
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={currentNote.title}
              onChange={handleChangeNote}
            />
            <TextField
              margin="dense"
              id="content"
              name="content"
              label="Content"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={currentNote.content}
              onChange={handleChangeNote}
            />
            <Button
              onClick={handleSaveNote}
              variant="contained"
              color="primary"
              sx={{
                marginTop: '20px',
                float: 'right',
                color: 'black',
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              {isEditingNote ? 'Save Note' : 'Add Note'}
            </Button>
          </Box>
        </Modal>
      </>
    );
  }
);

NoteModal.displayName = 'NoteModal';
