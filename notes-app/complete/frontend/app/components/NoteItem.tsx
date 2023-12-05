import {
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistanceToNow } from 'date-fns';

import { Note, OnNoteAction } from '@/utils/types';

type NoteItemProps = {
  note: Note;
  onEdit: OnNoteAction;
  onDelete: OnNoteAction;
};

export const NoteItem = ({ note, onEdit, onDelete }: NoteItemProps) => (
  <ListItem
    component={Paper}
    elevation={3}
    style={{ margin: '10px 0', padding: '0 10px', position: 'relative' }}
  >
    <ListItemText
      primary={<Typography variant="h6">{note.title}</Typography>}
      secondary={note.content}
    />
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="caption"
        style={{ color: 'grey', marginRight: '20px' }}
      >
        Updated{' '}
        {formatDistanceToNow(new Date(note.timestamp), { addSuffix: true })}
      </Typography>
      <IconButton onClick={() => onEdit(note)} size="small">
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(note)} size="small">
        <DeleteIcon />
      </IconButton>
    </div>
  </ListItem>
);
