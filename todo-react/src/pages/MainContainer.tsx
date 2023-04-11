import { useAuth0 } from '@auth0/auth0-react';
import { Drawer, Grid, IconButton, Paper, Stack, ThemeProvider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCollection, useQuery } from '@squidcloud/react';
import CompletedList from '../components/CompletedList';
import ListContainer from '../components/ListContainer';
import { OptionsMenu } from '../components/MenuDetail';
import { Todo } from '../interfaces/types';
import TodoList from './TodoList';
import DateInfo from '../components/DateInfo';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import CalendarModal from '../modals/CalendarModal';
import Root from './Root';
import Header from '../components/Header';

import useMediaQuery from '@mui/material/useMediaQuery';

const MainContainer = () => {
  const isSmallScreen = useMediaQuery('(min-width:1200px)');

  const { user } = useAuth0();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState<any>(false);

  const collection = useCollection<Todo>('todos');

  const todosList = useQuery(collection.query().where('userId', '==', `${user?.sub}`), true);

  return (
    <Stack>
      <Header setDrawerOpen={setDrawerOpen} />
      <Box px={10} py={7}>
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ p: '20px', width: '350px' }}>
            <ListContainer todosList={todosList} collection={collection} />
          </Box>
        </Drawer>

        <Grid container spacing={5}>
          <Grid item xs={12} md={3} lg={2} className="list">
            <Box className="list_container" sx={{ display: { xs: 'none', md: 'block' } }}>
              <ListContainer todosList={todosList} collection={collection} />
            </Box>
          </Grid>

          <Grid item xs={12} md={9} lg={7}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4">In Progress</Typography>
              <OptionsMenu collection={collection} />
            </Box>
            <TodoList />

            <Box sx={{ marginTop: '50px' }}>
              <Typography variant="h4">Completed</Typography>
              <CompletedList />
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
              <DateInfo todosList={todosList} />
            </Box>
            {!isSmallScreen && (
              <Box className="calendar_icon">
                <IconButton onClick={() => setOpen(true)}>
                  <CalendarTodayIcon sx={{ display: { xs: 'block', md: 'block', lg: 'none' } }} fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Grid>
        </Grid>

        <CalendarModal open={open} setOpen={setOpen} />
      </Box>
    </Stack>
  );
};

export default MainContainer;
