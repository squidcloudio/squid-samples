import { Box, Divider } from '@mui/material';
import { useCollection, useQuery } from '@squidcloud/react';
import { useEffect, useState } from 'react';

import addList from '../images/Component 1.png';

import { NavLink, useParams } from 'react-router-dom';
import ListModal from '../modals/ListModal';
import { Item } from '../interfaces/types';

const ListContainer = ({ todosList, collection }: any) => {
  const { id } = useParams();
  const itemsCollection = useCollection<Item>('items');

  const items2 = useQuery(itemsCollection.query().where('todoId', '==', `${id}`), true);

  const [itemLength, setItemLength] = useState(0);
  useEffect(() => {
    setItemLength(items2.length);
    console.log(itemLength);
  }, [itemLength, items2.length]);

  const [open, setOpen] = useState<boolean>(false);
  // const items = useQuery(itemsCollection.query(), true);
  // const todosList = useQuery(collection.query().where('title', 'not in', ['Today', 'Tomorrow', 'Someday']), true);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <ul>
        {todosList.map((todo: any, i: any) => {
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
                <div className="navlink_content-amount">{items2.length}</div>
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

      <ListModal collection={collection} id={id} open={open} setOpen={setOpen} />
    </>
  );
};

export default ListContainer;
