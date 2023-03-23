import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Calendar from '../components/Calendar';
import FinishedList from '../components/FinishedList';
import ListContainer from '../components/ListContainer';
import TodoList from './TodoList';

const MainContainer = () => {
  return (
    <Box px={15} py={7}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={2}>
          <ListContainer />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h4">In Progress</Typography>

          <Paper>
            <TodoList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <Calendar />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  // <Box width={1}>
  //       <TodoList />
  //       <FinishedList />
  //     </Box>

  //     <Calendar /> */
};

export default MainContainer;
