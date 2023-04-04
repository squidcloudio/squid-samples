import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCollection, useQuery } from '@squidcloud/react';
import { useParams } from 'react-router-dom';
import Calendar from '../components/Calendar';
import CompletedList from '../components/CompletedList';
import ListContainer from '../components/ListContainer';
import { OptionsMenu } from '../components/MenuDetail';
import { Todo } from '../interfaces/types';
import TodoList from './TodoList';

const MainContainer = () => {
  const { id } = useParams();
  const { user } = useAuth0();

  const collection = useCollection<Todo>('todos');

  const todosList = useQuery(collection.query().where('userId', '==', `${user?.sub}`), true);
  const [currentTodo] = useQuery(collection.query().where('id', '==', `${id}`));

  return (
    <Box px={15} py={7}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={2}>
          <Box>
            <ListContainer todosList={todosList} collection={collection} />
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">{currentTodo?.data.title}</Typography>
            <OptionsMenu collection={collection} />
          </Box>
          <Paper>
            <TodoList />
          </Paper>

          <CompletedList />
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <Calendar />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainContainer;
