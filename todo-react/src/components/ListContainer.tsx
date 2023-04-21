import { Box, Divider } from '@mui/material';
import { useCallback, useContext, useState } from 'react';

import addList from '../images/Component 1.png';

import { NavLink, useParams } from 'react-router-dom';
import ListModal from '../modals/ListModal';
import { ThemeContext } from '../context';

const ListContainer = ({ todosList, collection, datesList }: any) => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback((value: any) => {
    setOpen(value);
  }, []);

  return (
    <>
      <ul>
        {datesList.map((todo: any, i: any) => {
          const { id, title, color } = todo.data;
          // let currentTodoLength = datesList[i]; // Get the length for this item

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
                <div className="navlink_content-amount">{3}</div>
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
