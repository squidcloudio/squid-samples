import { Box, Divider } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ChevronLeft } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [hoveredDay, setHoveredDay] = useState(null);

  const nextWeek = () => {
    setCurrentDate(currentDate.clone().add(1, 'week'));
  };

  const previousWeek = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'week'));
  };

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handleDayHover = (day: any) => {
    setHoveredDay(day);
  };

  const getWeekdayStyle = (weekday: any) => {
    if (hoveredDay === null) {
      return {};
    }
    if (weekday === weekdays[hoveredDay]) {
      return { backgroundColor: '#F8F9FC', borderRadius: '6px 6px 0 0' };
    }
    return {};
  };

  return (
    <Box
      sx={{
        padding: '24px',
        borderRadius: '12px',
      }}
    >
      <div className="calendar">
        <div className="calendar_header">
          <span>{currentDate.format('MMMM YYYY')}</span>
          <div className="calendar_header-btn">
            <button onClick={previousWeek}>
              <ArrowBackIosNewIcon fontSize="medium" />
            </button>
            <button onClick={nextWeek}>
              <ArrowForwardIosIcon fontSize="medium" style={{ backgroundColor: 'transparent' }} />
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              {weekdays.map((weekday) => (
                <th key={weekday} style={getWeekdayStyle(weekday)}>
                  {weekday.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <td
                  key={day}
                  onMouseEnter={() => handleDayHover(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={hoveredDay === day ? 'hovered' : ''}
                >
                  <div key={day}>{currentDate.clone().startOf('week').add(day, 'day').format('D')}</div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="due">
        <Divider color="#E1E6EF" />
        <p style={{ paddingTop: '20px' }}>Due Tomorrow</p>
      </div>
      <Divider color="#E1E6EF" />
      <div className="overdue">
        <div></div>
        <span>Overdue</span>
      </div>
    </Box>
  );
};

export default Calendar;
