import { List } from '@mui/material';

import addList from '../images/Component 1.png';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCollection, useQuery } from '@squidcloud/react';

import { Todo, Item } from '../interfaces/types';
import ItemModal from '../modals/ItemModal';
import StyledListItem from '../styled/StyledListItem';
import { useAuth0 } from '@auth0/auth0-react';

const TodoList = () => {
  const { id } = useParams();
  const { user } = useAuth0();

  const [open, setOpen] = useState<boolean>(false);

  const collection = useCollection<Todo>('todos');
  const itemsCollection = useCollection<Item>('items');

  const items = useQuery(itemsCollection.query().where('todoId', '==', `${id}`), true);

  const [todos] = useQuery(collection.query().where('id', '==', `${id}`), true);

  const handleCheckboxClick = (itemId: any) => {
    console.log(itemId);
    const itemToUpdate = items.find((item) => item.data.id === itemId);
    console.log('this isit', itemToUpdate?.data);

    // update the item's status to "completed"
    itemsCollection.doc(itemId).update({ completed: true });

    // remove the item from the to-do list and add it to the completed list
    const updatedItems = items.filter((item) => item.data.id !== itemId);
    // const completedItem = { ...itemToUpdate, completed: true };
  };

  return (
    <div className="todo">
      <List>
        {items.map((item: any, i: any) => (
          <StyledListItem
            key={i}
            todos={todos}
            item={item}
            index={i}
            onClick={() => handleCheckboxClick(item.data.id)}
          />
        ))}

        <button className="item_button" onClick={() => setOpen(true)}>
          <img src={addList} alt="list" />
          <span>New Item</span>
        </button>

        <ItemModal collection={itemsCollection} todos={todos} open={open} setOpen={setOpen} items={items} />
      </List>
    </div>
  );
};

export default TodoList;
