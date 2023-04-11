import { Paper, Typography } from '@mui/material';
import { useCollection, useQuery } from '@squidcloud/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Item, Todo } from '../interfaces/types';
import StyledListItem from '../styled/StyledListItem';
import { List } from '@mui/material';

const CompletedList = () => {
  const { id } = useParams();
  const collection = useCollection<Todo>('todos');

  const itemsCollection = useCollection<Item>('items');
  const [todos] = useQuery(collection.query().where('id', '==', `${id}`), true);

  const items = useQuery(itemsCollection.query().where('todoId', '==', `${id}`), true);

  const handleCheckboxClick = (itemId: any) => {
    console.log(itemId);
    const itemToUpdate = items.find((item) => item.data.id === itemId);

    // update the item's status to "completed"
    itemsCollection.doc(itemId).update({ completed: true });

    // remove the item from the to-do list and add it to the completed list
    const updatedItems = items.filter((item) => item.data.id !== itemId);
    // const completedItem = { ...itemToUpdate, completed: true };
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
              onClick={() => handleCheckboxClick(item.data.id)}
            />
          ))}
      </List>
    </div>
  );
};

export default CompletedList;
