import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThreeDotsIcon from '../images/Union.svg';
import EditModal from '../modals/EditListModal';
import { useParams } from 'react-router-dom';
import { useQuery } from '@squidcloud/react';

export const OptionsMenu = ({ todosCollection, itemsCollection }: any) => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<boolean>(false);

  const items = useQuery(itemsCollection.query().where('todoId', '==', `${id}`), true);

  const deleteItems = () => {
    items.forEach((el) => {
      itemsCollection.doc(el.data.id).delete();
    });
  };

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const deleteTodo = () => {
    deleteItems();
    todosCollection.doc(id).delete();
    navigate('/');
  };

  return (
    <>
      {!['today', 'tomorrow', 'someday'].includes(id as string) && (
        <IconButton onClick={handleOpenMenu}>
          <img src={ThreeDotsIcon} alt="" />
        </IconButton>
      )}
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
      <EditModal collection={todosCollection} id={id} open={open} setOpen={setOpen} />
    </>
  );
};
