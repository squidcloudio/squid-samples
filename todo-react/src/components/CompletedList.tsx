import { useCollection, useQuery } from '@squidcloud/react';
import { useParams } from 'react-router-dom';
import { Item, Todo } from '../interfaces/index';
import StyledListItem from '../styled/StyledListItem';
import { List } from '@mui/material';

const CompletedList = () => {
  const { id } = useParams();
  const todosCollection = useCollection<Todo>('todos');

  const itemsCollection = useCollection<Item>('items');
  const [todos] = useQuery(todosCollection.query().where('id', '==', `${id}`), true);

  const items = useQuery(itemsCollection.query().where('todoId', '==', `${id}`), true);

  const changeStatusToCompleted = (itemId: any) => {
    itemsCollection.doc(itemId).update({ completed: true });
  };

  return (
    <div className="todo">
      <List>
        {items
          .filter((item) => item.data.completed === true)
          .map((item: any, i: any) => (
            <StyledListItem
              isChecked={true}
              key={i}
              todos={todos}
              item={item}
              index={i}
              onClick={() => changeStatusToCompleted(item.data.id)}
            />
          ))}
      </List>
    </div>
  );
};

export default CompletedList;
