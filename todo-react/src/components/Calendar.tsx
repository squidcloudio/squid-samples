import { Box, Divider } from '@mui/material';
import React from 'react';
const Calendar = () => {
  return (
    <Box
      sx={{
        height: '800px',
        width: '300px',
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <p>Calendar</p>
      </div>
      <div>
        <Divider color="#E1E6EF" />
        <p style={{ paddingTop: '20px' }}>Due Tomorrow</p>
      </div>
      <Divider color="#E1E6EF" />
      <div>
        <p>Overdue</p>
      </div>
    </Box>
  );
};

export default Calendar;
