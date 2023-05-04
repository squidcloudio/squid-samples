import { useState } from 'react';
import { Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
import ThreeDotsIcon from '../images/Union.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@squidcloud/react';
import { useAuth0 } from '@auth0/auth0-react';
import EditButton from '../images/EditButton';
import DeleteButton from './DeleteButton';
import { Typography } from '@mui/material';
import ListContainerModal from '../modals/ListContainerModal';

export const ListEdit = ({
  todosCollection,
  itemsCollection,
  index,
  forTitle,
  todos,
  isCompleted,
  fromCalendar,
  fromList,
  todosList,
  fromDefaultList,
}: any) => {
  const { id } = useParams();
  const { user } = useAuth0();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<boolean>(false);

  const tasksInCurrentList = useQuery(
    itemsCollection.query().where('userId', '==', `${user?.sub}`).where('listId', '==', `${id}`),
    true,
  );

  const [currentItem] = todosList?.filter((el: any, i: any) => i === index);

  const deleteItems = () => {
    for (const task of tasksInCurrentList) {
      itemsCollection.doc(task.data.id).delete();
    }
  };

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const deleteTodo = async () => {
    deleteItems();
    await todosCollection.doc(currentItem?.data.id).delete();
    navigate('/today');
  };

  return (
    <>
      <div className={`sidebar_menu-container_fromList ${fromList && 'sidebar_menu-container-list'}`}>
        {forTitle && (
          <Typography variant="h4">{!isCompleted ? todos?.data.activeLabel : todos?.data.completeLabel}</Typography>
        )}

        {(!['today', 'tomorrow', 'someday'].includes(id as string) || fromCalendar || fromDefaultList) && (
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

        <MenuItem onClick={deleteTodo}>
          <ListItemIcon>
            <DeleteButton />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      <ListContainerModal
        collection={todosCollection}
        id={id}
        open={open}
        setOpen={setOpen}
        currentItem={currentItem}
      />
    </>
  );
};
