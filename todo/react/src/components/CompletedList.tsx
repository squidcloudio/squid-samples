import { useQuery } from '@squidcloud/react';
import { useParams } from 'react-router-dom';
import StyledListItem from '../styled/StyledListItem';
import { Box, List } from '@mui/material';
import React, { useContext } from 'react';
import { ThemeContext } from '../context';
import { OptionsMenu } from './MenuDetail';

const CompletedList = React.memo(({ todosCollection, itemsCollection }: any) => {
  const { id } = useParams();
  const [todos] = useQuery(todosCollection.query().where('id', '==', `${id}`), true);
  const items = useQuery(itemsCollection.query().where('listId', '==', `${id}`), true);
  const { theme } = useContext(ThemeContext);

  const changeStatusToInProgress = (itemId: any) => {
    itemsCollection.doc(itemId).update({ completed: false });
  };

  const completedItems = items.filter((item) => item.data.completed === true);

  return completedItems.length > 0 ? (
    <Box sx={{ marginTop: '50px' }}>
      <OptionsMenu
        todosCollection={todosCollection}
        itemsCollection={itemsCollection}
        forTitle={true}
        todos={todos}
        isCompleted={true}
      />

      <div className={`todo todo-${theme}`}>
        <List>
          {completedItems.map((item: any, i: any) => (
            <StyledListItem
              isChecked={true}
              key={i}
              todos={todos}
              item={item}
              index={i}
              onClick={() => changeStatusToInProgress(item.data.id)}
            />
          ))}
        </List>
      </div>
    </Box>
  ) : null;
});

export default CompletedList;
