import { Box } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';

import Calendar from './Calendar';

const DateInfo = ({ todosList }: any) => {
  const [currentDate, setCurrentDate] = useState(moment());

  return (
    <Box className="calendar_box">
      <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} todosList={todosList} />
    </Box>
  );
};

export default DateInfo;
