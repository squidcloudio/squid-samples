import { useState, useContext } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Drawer, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCollection, useQuery } from '@squidcloud/react';
import CompletedList from '../components/CompletedList';
import ListContainer from '../components/ListContainer';
import { OptionsMenu } from '../components/MenuDetail';
import { Item, Todo } from '../interfaces/index';
import TodoList from './TodoList';
import DateInfo from '../components/DateInfo';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarModal from '../modals/CalendarModal';
import Header from '../components/Header';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../context';

const MainContainer = () => {
  const isSmallScreen = useMediaQuery('(min-width:1200px)');
  const { theme, setTheme } = useContext(ThemeContext);

  console.log('t', theme);

  const { id } = useParams();

  const { user } = useAuth0();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState<any>(false);

  const todosCollection = useCollection<Todo>('todos');
  const itemsCollection = useCollection<Item>('items');

  const [todos] = useQuery(todosCollection.query().where('id', '==', `${id}`), true);

  const todosList = useQuery(todosCollection.query().where('userId', '==', `${user?.sub}`), true);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Stack className={`theme-${theme}`}>
        <Header setDrawerOpen={setDrawerOpen} todosCollection={todosCollection} todos={todos} />
        <Box px={10} py={7}>
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box
              sx={{
                p: '20px',
                width: '350px',
                backgroundColor: theme === 'light' ? '#fff' : '#1b1f27',
                height: '100%',
              }}
            >
              <ListContainer todosList={todosList} collection={todosCollection} />
            </Box>
          </Drawer>

          <Grid container spacing={5}>
            <Grid item xs={12} md={3} lg={2} className="list">
              <Box className="list_container" sx={{ display: { xs: 'none', md: 'block' } }}>
                <ListContainer todosList={todosList} collection={todosCollection} />
              </Box>
            </Grid>

            <Grid item xs={12} md={9} lg={7}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4">In Progress</Typography>
                <OptionsMenu todosCollection={todosCollection} itemsCollection={itemsCollection} />
              </Box>

              <TodoList itemsCollection={itemsCollection} todos={todos} theme={theme} />

              <CompletedList todosCollection={todosCollection} itemsCollection={itemsCollection} theme={theme} />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Box sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
                <DateInfo todosList={todosList} />
              </Box>
              {!isSmallScreen && (
                <Box className="calendar_icon">
                  <IconButton
                    onClick={() => setOpen(true)}
                    style={{ backgroundColor: todos ? todos.data.color : '#dad' }}
                  >
                    <CalendarTodayIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Grid>
          </Grid>

          <CalendarModal open={open} setOpen={setOpen} />
        </Box>
      </Stack>
    </ThemeContext.Provider>
  );
};

export default MainContainer;
