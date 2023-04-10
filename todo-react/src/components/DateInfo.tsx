import { Box } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';

import Calendar from './Calendar';

const DateInfo = ({ todosList }: any) => {
  const [currentDate, setCurrentDate] = useState(moment());

  return (
    <Box
      sx={{
        padding: '24px',
        borderRadius: '12px',
        minWidth: '300px',
        backgroundColor: '#fff',
      }}
    >
      <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} todosList={todosList} />
    </Box>
  );
};

export default DateInfo;
