import { Box, Divider } from '@mui/material';
import { useCallback, useContext, useState } from 'react';

import addList from '../images/Component 1.png';

import { NavLink, useParams } from 'react-router-dom';
import ListModal from '../modals/ListModal';
import { ThemeContext } from '../context';
import { useQuery } from '@squidcloud/react';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';
import AmountTasks from './AmountTasks';
import { ListEdit } from './ListEdit';

const ListContainer = ({ collection, datesList, itemsCollection }: any) => {
  const { id } = useParams();
  const { user } = useAuth0();
  const { theme } = useContext(ThemeContext);

  const todosList = useQuery(collection.query().where('userId', '==', `${user?.sub}`), true) || [];

  const tasksQuery = useQuery(itemsCollection.query().where('userId', '==', `${user?.sub}`), true);

  const today = moment().format('M/D/YYYY');
  const tomorrow = moment().add(1, 'day').startOf('day').format('M/D/YYYY');

  const [open, setOpen] = useState<boolean>(false);
  const [hoveredDay, setHoveredDay] = useState<any>(null);

  const handleOpen = useCallback((value: any) => {
    setOpen(value);
  }, []);

  return (
    <>
      <ul>
        {datesList?.map((todo: any, i: any) => {
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
                <div className="navlink_content-amount">
                  <AmountTasks
                    date={id === 'today' ? today : id === 'tomorrow' ? tomorrow : ''}
                    tasks={tasksQuery}
                    someday={id === 'someday'}
                  />
                </div>
              </NavLink>
            </div>
          );
        })}
      </ul>
      <Box py={3}>
        <Divider className={`divider-${theme}`} />
      </Box>
      <>
        <ul>
          {todosList?.map((todo: any, i: any) => {
            const { id, title, color } = todo.data;

            return (
              <div
                className="navlink navlink_spec"
                key={id}
                onMouseEnter={() => setHoveredDay(i)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <NavLink
                  key={id}
                  to={`/${id}`}
                  className={`navlink_content theme-${theme} navlink_span`}
                  style={({ isActive }) => {
                    return isActive
                      ? { backgroundColor: theme === 'dark' ? '#32363E' : '#E1E6EF' }
                      : { backgroundColor: 'transparent' };
                  }}
                >
                  <div className="navlink_content-color" style={{ backgroundColor: `${color}` }}></div>
                  <div className="navlink_content-title">{title}</div>
                  <div className="navlink_content-amount">
                    {
                      tasksQuery?.filter((el) => el.data.completed === false).filter((task) => task.data.listId === id)
                        .length
                    }
                  </div>
                </NavLink>

                {hoveredDay === i && (
                  <ListEdit
                    itemsCollection={itemsCollection}
                    todosCollection={collection}
                    isCompleted
                    todosList={todosList}
                    index={i}
                    fromDefaultList
                  />
                )}
              </div>
            );
          })}
        </ul>
      </>
      {todosList?.length > 0 && (
        <Box py={3}>
          <Divider className={`divider-${theme}`} />
        </Box>
      )}
      <button onClick={handleOpen} className="list_button">
        <img src={addList} alt="list" />
        <span>New list</span>
      </button>

      <ListModal collection={collection} id={id} open={open} setOpen={setOpen} />
    </>
  );
};

export default ListContainer;
