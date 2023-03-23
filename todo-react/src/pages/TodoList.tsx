import {
  Card,
  CardContent,
  Checkbox,
  List,
  ListItem,
  TextField,
  Container,
  IconButton,
  Typography,
  Divider,
  Box,
} from '@mui/material';

import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    setTodos([...todos, inputValue]);
    setInputValue('');
  };

  const handleDeleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="todo">
      <List>
        {[1, 2].map((el) => {
          return (
            <ListItem>
              <Box width={1} display="flex" alignItems="flex-start">
                <Checkbox size="small" />
                <Box width={1} mt={1}>
                  <Typography pb={1}>Weekly presentation</Typography>
                  <Typography mb={1}>Present Weekly update during team demo</Typography>
                  <Divider color="#E1E6EF" />
                  <Box pt={1} display="flex" justifyContent="space-between">
                    <Typography>Due date</Typography>
                    <Typography>Weekly</Typography>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default TodoList;
