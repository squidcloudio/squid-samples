import { Box, Divider } from '@mui/material';
import { useCollection, useQuery } from '@squidcloud/react';
import { useContext, useEffect, useState } from 'react';

import addList from '../images/Component 1.png';

import { NavLink, useParams } from 'react-router-dom';
import ListModal from '../modals/ListModal';
import { Item } from '../interfaces/index';
import { ThemeContext } from '../context';

const ListContainer = ({ todosList, collection }: any) => {
  const { id } = useParams();
  const itemsCollection = useCollection<Item>('items');
  const { theme } = useContext(ThemeContext);

  const items2 = useQuery(itemsCollection.query().where('todoId', '==', `${id}`), true);

  const [itemLength, setItemLength] = useState(0);

  useEffect(() => {
    setItemLength(items2.length);
  }, [itemLength, items2.length]);

  const [open, setOpen] = useState<boolean>(false);

  const datesList = useQuery(collection.query().where('title', 'in', ['Today', 'Tomorrow', 'Someday']), true);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <ul>
        {datesList.map((todo: any) => {
          const { id, title, color } = todo.data;

          return (
            <div className="navlink" key={id}>
              <NavLink
                key={id}
                to={`/${id}`}
                className={`navlink_content theme-${theme}`}
                style={({ isActive }) => {
                  return isActive
                    ? { backgroundColor: theme === 'dark' ? '#32363E' : '#E1E6EF' }
                    : { backgroundColor: 'transparent' };
                }}
              >
                <div className="navlink_content-color" style={{ backgroundColor: `${color}` }}></div>
                <div className="navlink_content-title">{title}</div>
                <div className="navlink_content-amount">{0}</div>
              </NavLink>
            </div>
          );
        })}
      </ul>
      <Box py={3}>
        <Divider className={`divider-${theme}`} />
      </Box>
      <ul>
        {todosList.map((todo: any) => {
          const { id, title, color } = todo.data;

          return (
            <div className="navlink" key={id}>
              <NavLink
                key={id}
                to={`/${id}`}
                className={`navlink_content theme-${theme}`}
                style={({ isActive }) => {
                  return isActive
                    ? { backgroundColor: theme === 'dark' ? '#32363E' : '#E1E6EF' }
                    : { backgroundColor: 'transparent' };
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
      {todosList.length > 0 && (
        <Box py={3}>
          <Divider className={`divider-${theme}`} />
        </Box>
      )}
      <button onClick={handleOpen} className="list_button">
        <img src={addList} alt="list" />
        <span>New List</span>
      </button>

      <ListModal collection={collection} id={id} open={open} setOpen={setOpen} />
    </>
  );
};

export default ListContainer;
