import { useState } from 'react';
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
import CompletedIcon from '../images/CompletedIcon';

export const OptionsMenu = ({
  todosCollection,
  itemsCollection,
  isEditable,
  index,
  forTitle,
  todos,
  isCompleted,
  fromCalendar,
}: any) => {
  const { id } = useParams();
  const { user } = useAuth0();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<boolean>(false);

  const items = useQuery(itemsCollection.query().where('userId', '==', `${user?.sub}`), true);

  const [currentItem] = items.filter((el) => el.data.id === index);

  const tasksInCurrentList = useQuery(
    itemsCollection.query().where('userId', '==', `${user?.sub}`).where('listId', '==', `${id}`),
    true,
  );

  const inProgressTasksInCurrentList = tasksInCurrentList.filter((el) => el.data.completed === false);
  const completedTasksInCurrentList = tasksInCurrentList.filter((el) => el.data.completed === true);

  const deleteItems = () => {
    for (const task of tasksInCurrentList) {
      itemsCollection.doc(task.data.id).delete();
    }
  };

  const deleteCompletedTasks = () => {
    for (const task of completedTasksInCurrentList) {
      itemsCollection.doc(task.data.id).delete();
    }
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
  };

  const deleteCurrentItem = () => {
    itemsCollection.doc(currentItem.data.id).delete();
  };

  const changeStatusToCompleted = () => {
    for (const task of inProgressTasksInCurrentList) {
      itemsCollection.doc(task.data.id).update({ completed: true });
    }
  };

  return (
    <>
      <div className="sidebar_menu-container">
        {forTitle && (
          <Typography variant="h4">{!isCompleted ? todos?.data.activeLabel : todos?.data.completeLabel}</Typography>
        )}

        {(!['today', 'tomorrow', 'someday'].includes(id as string) || fromCalendar) && (
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
          {fromCalendar ? 'Edit' : 'Edit label'}
        </MenuItem>

        {fromCalendar && (
          <MenuItem onClick={index ? deleteCurrentItem : deleteTodo}>
            <ListItemIcon>
              <DeleteButton />
            </ListItemIcon>
            Delete
          </MenuItem>
        )}

        {!fromCalendar && !isCompleted && inProgressTasksInCurrentList.length > 0 && (
          <MenuItem onClick={changeStatusToCompleted}>
            <ListItemIcon>
              <CompletedIcon />
            </ListItemIcon>
            Mark all complete
          </MenuItem>
        )}

        {!fromCalendar && isCompleted && (
          <MenuItem onClick={deleteCompletedTasks}>
            <ListItemIcon>
              <CompletedIcon />
            </ListItemIcon>
            Clear all tasks
          </MenuItem>
        )}
      </Menu>

      {!isEditable && (
        <EditModal collection={todosCollection} id={id} open={open} setOpen={setOpen} isCompleted={isCompleted} />
      )}

      {isEditable && <EditItem open={open} setOpen={setOpen} index={index} todos={todos} />}
    </>
  );
};
