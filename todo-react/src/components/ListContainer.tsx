import { Box, Divider } from '@mui/material';
import { useCollection, useQuery } from '@squidcloud/react';
import { NavLink, useParams } from 'react-router-dom';

export type Todo = {
  id?: string;
  title?: string;
  color: string;
  userId: string;
};

const ListContainer = () => {
  const { id } = useParams();
  const collection = useCollection<Todo>('todos');

  const todos = useQuery(collection.query(), true);

  console.log(todos.map((el) => el.data));

  return (
    <>
      <ul>
        {todos.map((todo) => {
          const { id, title, color } = todo.data;

          return (
            <NavLink key={id} to={`/${id}`} className="navlink">
              <div className="navlink_content">
                <div className="navlink_content-color" style={{ backgroundColor: `${color}` }}></div>
                <div className="navlink_content-title">{title}</div>
                <div className="navlink_content-amount">2</div>
              </div>
            </NavLink>
          );
        })}
      </ul>
      <Box py={3}>
        <Divider className="divider" />
      </Box>
      <p>Test</p>
    </>
  );
};

export default ListContainer;
