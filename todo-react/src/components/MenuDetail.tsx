import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThreeDotsIcon from '../images/Union.svg';
import EditModal from '../modals/EditListModal';
import { useParams } from 'react-router-dom';

export const OptionsMenu = ({ collection }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const deleteTodo = () => {
    collection.doc(id).delete();
    navigate('/');
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <img src={ThreeDotsIcon} alt="" />
      </IconButton>
      <Menu
        onClick={handleCloseMenu}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => setOpen(true)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={deleteTodo}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <EditModal collection={collection} id={id} open={open} setOpen={setOpen} />
    </>
  );
};
