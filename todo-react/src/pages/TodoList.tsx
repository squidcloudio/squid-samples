import { List } from '@mui/material';

import addList from '../images/Component 1.png';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCollection, useQuery } from '@squidcloud/react';

import { Todo, Item } from '../interfaces/index';
import ItemModal from '../modals/ItemModal';
import StyledListItem from '../styled/StyledListItem';

const TodoList = () => {
  const { id } = useParams();

  const [open, setOpen] = useState<boolean>(false);

  const todosCollection = useCollection<Todo>('todos');
  const itemsCollection = useCollection<Item>('items');

  const items = useQuery(itemsCollection.query().where('todoId', '==', `${id}`), true);

  const [todos] = useQuery(todosCollection.query().where('id', '==', `${id}`), true);

  const changeStatusToCompleted = (itemId: any) => {
    itemsCollection.doc(itemId).update({ completed: true });
  };

  return (
    <div className="todo">
      <List>
        {items
          .filter((item) => item.data.completed === false)
          .map((item: any, i: any) => (
            <StyledListItem
              isChecked={false}
              key={i}
              todos={todos}
              item={item}
              index={i}
              onClick={() => changeStatusToCompleted(item.data.id)}
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
