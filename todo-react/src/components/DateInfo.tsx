import { Box, Divider } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Calendar from './Calendar';

const DateInfo = ({ todosList }: any) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [today, setToday] = useState(currentDate);

  return (
    <Box
      sx={{
        padding: '24px',
        borderRadius: '12px',
      }}
    >
      <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} todosList={todosList} />
    </Box>
  );
};

export default DateInfo;
