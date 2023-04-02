import { Box, Divider } from '@mui/material';
import { useCollection, useQuery } from '@squidcloud/react';
import { useState } from 'react';

import addList from '../images/Component 1.png';

import { Todo } from '../interfaces/types';

import { NavLink, useParams } from 'react-router-dom';
import ListModal from '../modals/ListModal';

const ListContainer = () => {
  const { id } = useParams();

  const [open, setOpen] = useState<boolean>(false);
  const collection = useCollection<Todo>('todos');

  // const todosList = useQuery(collection.query().where('title', 'not in', ['Today', 'Tomorrow', 'Someday']), true);
  const todosList = useQuery(collection.query(), true);

  const [todos] = useQuery(collection.query().where('id', '==', `${id}`), true);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <ul>
        {todosList.map((todo, i) => {
          const { id, title, color } = todo.data;
          return (
            <div className="navlink" key={i}>
              <NavLink
                key={id}
                to={`/${id}`}
                className="navlink_content"
                style={({ isActive }) => {
                  return isActive ? { backgroundColor: '#E1E6EF' } : { backgroundColor: 'transparent' };
                }}
              >
                <div className="navlink_content-color" style={{ backgroundColor: `${color}` }}></div>
                <div className="navlink_content-title">{title}</div>
                <div className="navlink_content-amount">{2}</div>
              </NavLink>
            </div>
          );
        })}
      </ul>
      <Box py={3}>
        <Divider className="divider" />
      </Box>
      <button onClick={handleOpen} className="list_button">
        <img src={addList} alt="list" />
        <span>New List</span>
      </button>

      <ListModal collection={collection} id={id} todos={todos} open={open} setOpen={setOpen} />
    </>
  );
};

export default ListContainer;
