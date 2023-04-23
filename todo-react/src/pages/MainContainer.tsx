import { useState, useCallback } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Divider, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCollection, useQuery } from '@squidcloud/react';
import CompletedList from '../components/CompletedList';
import ListContainer from '../components/ListContainer';
import { OptionsMenu } from '../components/MenuDetail';
import { List, Task } from '../interfaces/index';
import TodoList from './TodoList';
import DateInfo from '../components/DateInfo';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarModal from '../modals/CalendarModal';
import Header from '../components/Header';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../context';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const MainContainer = React.memo(() => {
  const isSmallScreen = useMediaQuery('(min-width:1200px)');

  const { theme, setTheme } = useTheme();

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  const { id } = useParams();

  const { user, logout } = useAuth0();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState<any>(false);

  const todosCollection = useCollection<List>('lists');
  const itemsCollection = useCollection<Task>('tasks');

  const [todos] = useQuery(todosCollection.query().where('id', '==', `${id}`), true);
  const datesList = useQuery(todosCollection.query().where('title', 'in', ['Today', 'Tomorrow', 'Someday']), true);

  const todosList = useQuery(todosCollection.query().where('userId', '==', `${user?.sub}`), true);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Stack className={`theme-${theme}`}>
        <Header setDrawerOpen={setDrawerOpen} onThemeToggle={handleThemeToggle} />
        <Box px={10} py={7}>
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box className="sidebar_menu" sx={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1f27' }}>
              <ListContainer todosList={todosList} collection={todosCollection} datesList={datesList} />
              <div className="sidebar_profile">
                <button style={{ color: theme === 'dark' ? '#fff' : '#000' }} onClick={handleThemeToggle}>
                  {theme === 'dark' ? (
                    <LightModeOutlinedIcon fontSize="small" />
                  ) : (
                    <DarkModeOutlinedIcon fontSize="small" />
                  )}
                  <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
                </button>
                <button
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  style={{ color: theme === 'dark' ? '#fff' : '#000' }}
                >
                  <LogoutIcon fontSize="small" />
                  <span>Logout</span>
                </button>
              </div>
            </Box>
          </Drawer>

          <Grid container spacing={5}>
            <Grid item xs={12} md={3} lg={2} className="list">
              <Box className="list_container" sx={{ display: { xs: 'none', md: 'block' } }}>
                <ListContainer todosList={todosList} collection={todosCollection} datesList={datesList} />
              </Box>
            </Grid>

            <div className="active_navlink active_navlink-tab">
              <div className="sidebar_item-color">
                <div style={{ backgroundColor: todos?.data.color }}></div>
                <span>{todos?.data.title}</span>
              </div>

              <Divider className={`divider-${theme}`} />
            </div>

            <Grid item xs={12} md={9} lg={7}>
              <Box display="flex" justifyContent="space-between">
                <OptionsMenu
                  todosCollection={todosCollection}
                  itemsCollection={itemsCollection}
                  forTitle={true}
                  todos={todos}
                />
              </Box>

              <TodoList itemsCollection={itemsCollection} todos={todos} />

              <CompletedList
                todosCollection={todosCollection}
                itemsCollection={itemsCollection}
                theme={theme}
                todos={todos}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Box sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
                <DateInfo todosList={todosList} />
              </Box>
              {!isSmallScreen && (
                <Box className="calendar_icon">
                  <IconButton
                    onClick={() => setOpen(true)}
                    style={{ backgroundColor: todos ? todos.data.color : '#14BE6e' }}
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
});

export default MainContainer;
