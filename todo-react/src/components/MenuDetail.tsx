import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThreeDotsIcon from '../images/Union.svg';
import EditModal from '../modals/EditListModal';
import { useParams } from 'react-router-dom';
import { useQuery } from '@squidcloud/react';
import EditItem from '../modals/EditItem';
import { useAuth0 } from '@auth0/auth0-react';

export const OptionsMenu = ({ todosCollection, itemsCollection, isEditable, index }: any) => {
  const { id } = useParams();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<boolean>(false);

  const items = useQuery(itemsCollection.query().where('userId', '==', `${user?.sub}`), true);
  const [todos] = useQuery(todosCollection.query().where('id', '==', `${id}`), true);

  const [currentItem] = items.filter((el) => el.data.id === index);

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

  const deleteCurrentItem = () => {
    itemsCollection.doc(currentItem.data.id).delete();
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
        <MenuItem onClick={index ? deleteCurrentItem : deleteTodo}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      {!isEditable && <EditModal collection={todosCollection} id={id} open={open} setOpen={setOpen} />}
      {isEditable && <EditItem open={open} setOpen={setOpen} index={index} todos={todos} />}
    </>
  );
};
