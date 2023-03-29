import { Checkbox, List, ListItem, Typography, Divider, Box } from '@mui/material';

import addList from '../images/Component 1.png';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCollection, useQuery } from '@squidcloud/react';

import { Todo, Item } from '../interfaces/types';
import ItemModal from '../modals/ItemModal';

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
        {items.map((item) => {
          return (
            <ListItem>
              <Box width={1} display="flex" alignItems="flex-start">
                <Checkbox size="small" />
                <Box width={1} mt={1}>
                  <Typography pb={1}>{item.data.title}</Typography>
                  <Typography mb={1}>{item.data.description}</Typography>
                  <Divider color="#E1E6EF" />
                  <Box pt={1} display="flex" justifyContent="space-between">
                    <Typography>
                      DUE DATE: <span>{item.data.dueDate}</span>
                    </Typography>
                    <Typography>
                      {item.data.tags.map((tag, i) => {
                        return (
                          <div className="tag-item" key={i}>
                            <span className="text">{tag.name}</span>
                          </div>
                        );
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          );
        })}

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
