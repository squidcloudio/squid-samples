import moment from 'moment';
import { useEffect, useState, useRef } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Divider } from '@mui/material';
import { useCollection, useQuery } from '@squidcloud/react';
import { Item, Todo } from '../interfaces/index';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import { OptionsMenu } from './MenuDetail';
import ItemModal from '../modals/ItemModal';

const Calendar = ({ currentDate, setCurrentDate }: any) => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [hoveredDay, setHoveredDay] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState<any>(currentDate);
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const todosCollection = useCollection<Todo>('todos');
  const [todos] = useQuery(todosCollection.query().where('id', '==', `${id}`), true);

  const initialDayRef = useRef(moment(currentDate));

  useEffect(() => {
    if (currentDate && !initialDayRef.current) {
      initialDayRef.current = moment(currentDate);
    }
  }, [currentDate]);

  const todayDate = moment.utc(initialDayRef.current).startOf('day').locale('en');

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const itemsCollection = useCollection<Item>('items');

  const items = useQuery(itemsCollection.query().where('userId', '==', `${user?.sub}`), true);

  const handleDayHover = (day: any) => {
    setHoveredDay(day);
  };

  const handleDayClick = (dayIndex: any) => {
    const clickedDate = currentDate.clone().startOf('week').add(dayIndex, 'day');
    setSelectedDay(clickedDate);
    setCurrentDate(clickedDate);
  };

  const getWeekdayStyle = (weekday: any) => {
    if (hoveredDay === null && selectedDay === null) {
      return {};
    }
    if (selectedDay && weekday === selectedDay.format('dd')) {
      return { backgroundColor: '#F4F6FA' };
    }
    return {};
  };

  const nextWeek = () => {
    setCurrentDate(currentDate.clone().add(1, 'week'));
  };

  const previousWeek = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'week'));
  };

  const overdueDates = items
    .filter((item) => item.data.completed === false)
    .map((el, i) => {
      const momentDate = moment.utc(el.data.dueDate).locale('en');
      if (momentDate.isBefore(todayDate)) {
        const daysAgo = momentDate.from(todayDate, true);
        return (
          <div className="overdue_due-item" key={i}>
            <p>{el.data.title}</p>
            <p>{daysAgo} ago</p>
          </div>
        );
      }
    });

  return (
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
            {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
              const date = currentDate.clone().startOf('week').add(dayIndex, 'day');
              return (
                <td
                  key={dayIndex}
                  onMouseEnter={() => handleDayHover(dayIndex)}
                  onMouseLeave={() => setHoveredDay(null)}
                  onClick={() => handleDayClick(dayIndex)}
                  style={getWeekdayStyle(date.format('dd'))}
                >
                  <div key={dayIndex} className={selectedDay && selectedDay.isSame(date, 'day') ? 'selected' : ''}>
                    {date.format('D')}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>

      <div className="due">
        <Divider color="#E1E6EF" />
        <>
          <p style={{ paddingTop: '20px' }}>{currentDate.format('D MMMM')}</p>

          {items.map((el, i) => {
            const dueDate = moment(el.data.dueDate, 'MM/DD/YYYY');

            if (dueDate.isSame(currentDate) && el.data.completed === false) {
              return (
                <div className="sidebar_item" key={i} onClick={() => navigate(`/${el.data.todoId}`)}>
                  <div className="sidebar_item-color">
                    <div style={{ backgroundColor: el.data.todoColor }}></div>
                    <span>{el.data.title}</span>
                  </div>

                  {/* <OptionsMenu itemsCollection={itemsCollection} /> */}
                </div>
              );
            }
          })}

          <div className="sidebar_item-add">
            <button className="sidebar_item-add-btn" onClick={() => setOpen(true)}>
              <span>+</span>
              <span>New Item</span>
            </button>
          </div>
        </>
      </div>
      <Divider color="#E1E6EF" />

      <div className="overdue">
        <div className="overdue_dot">
          <div className="overdue_dot-col"></div>
          <span>Overdue</span>
        </div>
        {overdueDates}
      </div>

      <ItemModal collection={itemsCollection} todos={todos} open={open} setOpen={setOpen} items={items} />
    </div>
  );
};

export default Calendar;
