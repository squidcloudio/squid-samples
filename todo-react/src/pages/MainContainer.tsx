import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCollection, useQuery } from '@squidcloud/react';
import { useParams } from 'react-router-dom';
import CompletedList from '../components/CompletedList';
import ListContainer from '../components/ListContainer';
import { OptionsMenu } from '../components/MenuDetail';
import { Todo } from '../interfaces/types';
import TodoList from './TodoList';
import DateInfo from '../components/DateInfo';

const MainContainer = () => {
  const { id } = useParams();
  const { user } = useAuth0();

  const collection = useCollection<Todo>('todos');

  const todosList = useQuery(collection.query().where('userId', '==', `${user?.sub}`), true);
  const [currentTodo] = useQuery(collection.query().where('id', '==', `${id}`));

  return (
    <Box px={10} py={7}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={2}>
          <Box className="list_container">
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
            <DateInfo todosList={todosList} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainContainer;
