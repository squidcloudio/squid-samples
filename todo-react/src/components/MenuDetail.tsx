import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
import ThreeDotsIcon from '../images/Union.svg';
import EditModal from '../modals/EditListModal';
import { useParams } from 'react-router-dom';
import { useQuery } from '@squidcloud/react';
import EditItem from '../modals/EditItem';
import { useAuth0 } from '@auth0/auth0-react';
import EditButton from '../images/EditButton';
import DeleteButton from './DeleteButton';
import { Typography } from '@mui/material';

export const OptionsMenu = ({
  todosCollection,
  itemsCollection,
  isEditable,
  index,
  forTitle,
  todos,
  isCompleted,
}: any) => {
  const { id } = useParams();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<boolean>(false);

  const items = useQuery(itemsCollection.query().where('userId', '==', `${user?.sub}`), true);

  const [currentItem] = items.filter((el) => el.data.id === index);

  const itemsInCurrentList = useQuery(
    itemsCollection.query().where('userId', '==', `${user?.sub}`).where('todoId', '==', `${id}`),
    true,
  );

  const deleteItems = () => {
    itemsInCurrentList.forEach((el) => {
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
    navigate('/today');
  };

  const deleteCurrentItem = () => {
    itemsCollection.doc(currentItem.data.id).delete();
  };

  return (
    <>
      <div className="sidebar_menu-container">
        {forTitle && (
          <Typography variant="h4">{!isCompleted ? todos?.data.activeLabel : todos?.data.completeLabel}</Typography>
        )}

        {!['today', 'tomorrow', 'someday'].includes(id as string) && (
          <IconButton onClick={handleOpenMenu}>
            <img src={ThreeDotsIcon} alt="" />
          </IconButton>
        )}
      </div>
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
            <EditButton />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={index ? deleteCurrentItem : deleteTodo}>
          <ListItemIcon>
            <DeleteButton />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      {!isEditable && (
        <EditModal collection={todosCollection} id={id} open={open} setOpen={setOpen} isCompleted={isCompleted} />
      )}
      {isEditable && <EditItem open={open} setOpen={setOpen} index={index} todos={todos} />}
    </>
  );
};
