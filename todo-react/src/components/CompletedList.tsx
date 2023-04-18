import { useQuery } from '@squidcloud/react';
import { useParams } from 'react-router-dom';
import StyledListItem from '../styled/StyledListItem';
import { Box, List, Typography } from '@mui/material';

const CompletedList = ({ todosCollection, itemsCollection, theme }: any) => {
  const { id } = useParams();
  const [todos] = useQuery(todosCollection.query().where('id', '==', `${id}`), true);
  const items = useQuery(itemsCollection.query().where('todoId', '==', `${id}`), true);

  const changeStatusToCompleted = (itemId: any) => {
    itemsCollection.doc(itemId).update({ completed: true });
  };

  const completedItems = items.filter((item) => item.data.completed === true);

  return completedItems.length > 0 ? (
    <Box sx={{ marginTop: '50px' }}>
      <Typography variant="h4">Completed</Typography>

      <div className={`todo todo-${theme}`}>
        <List>
          {completedItems.map((item: any, i: any) => (
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
    </Box>
  ) : null;
};

export default CompletedList;
