import { Paper, Typography } from '@mui/material';
import React from 'react';

const CompletedList = () => {
  return (
    <div className="todo_completed">
      <Typography variant="h4">Completed</Typography>
      <Paper>
        <div className="todo"></div>
      </Paper>
    </div>
  );
};

export default CompletedList;
