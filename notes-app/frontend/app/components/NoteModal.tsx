import { useState, useImperativeHandle, forwardRef, ChangeEvent } from 'react';
import { Modal, Box, Typography, TextField, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { OnNoteAction, Note } from '@/utils/types';

export type NoteModalProps = {
  onNoteSave: OnNoteAction;
};

export type NoteModalRef = {
  handleEditNote: (note: Note) => void;
};

const emptyNote = (): Note => ({
  id: '',
  title: '',
  content: '',
  timestamp: new Date(),
});

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

const buttonStyle = {
  marginTop: '20px',
  float: 'right',
  color: 'black',
  '&:hover': {
    color: 'white',
  },
};

type NoteTextFieldProps = {
  name: string;
  value: string;
  autoFocus: boolean;
  multiline: boolean;
  rows: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const NoteTextField = ({
  name,
  value,
  autoFocus,
  multiline,
  rows,
  onChange,
}: NoteTextFieldProps) => (
  <TextField
    autoFocus={autoFocus}
    margin="dense"
    id={name}
    name={name}
    label={name.charAt(0).toUpperCase() + name.slice(1)}
    type="text"
    fullWidth
    multiline={multiline}
    rows={rows}
    variant="outlined"
    value={value}
    onChange={onChange}
  />
);

export const NoteModal = forwardRef<NoteModalRef, NoteModalProps>(
  ({ onNoteSave }, ref) => {
    const [openModal, setOpenModal] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note>(emptyNote());

    useImperativeHandle(ref, () => ({
      handleEditNote: note => {
        setIsEditingNote(true);
        setCurrentNote(note);
        setOpenModal(true);
      },
    }));

    const handleModalToggle = (open: boolean, newNote: boolean = false) => {
      setOpenModal(open);
      if (newNote) {
        setIsEditingNote(false);
        setCurrentNote(emptyNote());
      }
    };

    const handleChangeNote = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCurrentNote(prevNote => ({ ...prevNote, [name]: value }));
    };

    const handleSaveNote = async () => {
      await onNoteSave(currentNote);
      handleModalToggle(false);
    };

    return (
      <>
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: 'fixed', right: 20, bottom: 20 }}
          onClick={() => handleModalToggle(true, true)}
        >
          <AddIcon />
        </Fab>

        <Modal
          open={openModal}
          onClose={() => handleModalToggle(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              {isEditingNote ? 'Edit' : 'New'} Note
            </Typography>
            <NoteTextField
              name="title"
              autoFocus={true}
              multiline={false}
              rows={1}
              value={currentNote.title}
              onChange={handleChangeNote}
            />
            <NoteTextField
              name="content"
              autoFocus={false}
              multiline={true}
              rows={4}
              value={currentNote.content}
              onChange={handleChangeNote}
            />
            <Button
              onClick={handleSaveNote}
              variant="contained"
              sx={buttonStyle}
            >
              {isEditingNote ? 'Save' : 'Add'} Note
            </Button>
          </Box>
        </Modal>
      </>
    );
  }
);

NoteModal.displayName = 'NoteModal';
