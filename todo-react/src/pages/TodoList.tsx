import { List } from '@mui/material';

import addList from '../images/Component 1.png';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCollection, useQuery } from '@squidcloud/react';

import { Todo, Item } from '../interfaces/types';
import ItemModal from '../modals/ItemModal';
import StyledListItem from '../styled/StyledListItem';

const TodoList = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { id } = useParams();
  const collection = useCollection<Todo>('todos');
  const itemsCollection = useCollection<Item>('items');

  const [todos] = useQuery(collection.query().where('id', '==', `${id}`), true);
  const items = useQuery(itemsCollection.query().where('todoId', '==', `${id}`), true);

  return (
    <div className="todo">
      <List>
        {items.map((item, i) => (
          <StyledListItem todos={todos} item={item} index={i} />
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
