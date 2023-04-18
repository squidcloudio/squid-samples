import { Box } from '@mui/material';
import moment from 'moment';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context';

import Calendar from './Calendar';

const DateInfo = ({ todosList }: any) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const { theme } = useContext(ThemeContext);

  return (
    <Box className={`calendar_box calendar-${theme}`}>
      <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} todosList={todosList} />
    </Box>
  );
};

export default DateInfo;
