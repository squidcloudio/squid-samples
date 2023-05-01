import moment from 'moment';
import { useEffect, useState, useRef, useContext } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Divider, Tooltip } from '@mui/material';
import { useCollection, useQuery } from '@squidcloud/react';
import { List, Task } from '../interfaces/index';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import { OptionsMenu } from './MenuDetail';
import ItemModal from '../modals/ItemModal';
import { ThemeContext } from '../context';
import addList from '../images/Component 1.png';

const Calendar = ({ currentDate, setCurrentDate }: any) => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [hoveredDay, setHoveredDay] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState<any>(moment().utc().local());
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const [open, setOpen] = useState<boolean>(false);
  const todosCollection = useCollection<List>('lists');
  const [todos] = useQuery(todosCollection.query().where('id', '==', `${id}`), true);

  const initialDayRef = useRef(moment(currentDate));

  useEffect(() => {
    if (currentDate && !initialDayRef.current) {
      initialDayRef.current = moment(currentDate);
    }
  }, [currentDate]);

  const todayDate = moment(initialDayRef.current).locale('en').utc().local();
  const tomorrowDate = moment().add(1, 'day').utc().local();

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const itemsCollection = useCollection<Task>('tasks');

  const todosList = useQuery(todosCollection.query().where('userId', '==', `${user?.sub}`), true);

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
      return { backgroundColor: theme === 'dark' ? '#32363E' : '#F4F6FA' };
    }
    return {};
  };

  const nextWeek = () => {
    setCurrentDate(currentDate.clone().add(1, 'week'));
  };

  const previousWeek = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'week'));
  };

  // eslint-disable-next-line array-callback-return
  const selectedDayItems = items.map((el, i) => {
    const dueDate = moment(el.data.dueDate, 'MM/DD/YYYY').utc().local();

    if (dueDate.isSame(currentDate, 'day') && el.data.completed === false) {
      return (
        <div key={i} className="sidebar_item">
          <div onClick={() => navigate(`/${el.data.listId}`)} style={{ flex: '2' }}>
            <div className="sidebar_item-color">
              <div style={{ backgroundColor: el.data.listColor }}></div>
              <Tooltip title={el.data.title}>
                <span className="sidebar_item-dots">{el.data.title}</span>
              </Tooltip>
            </div>
          </div>
          <OptionsMenu
            itemsCollection={itemsCollection}
            isEditable={true}
            index={el.data.id}
            todos={todos}
            todoCollection={todosCollection}
          />
        </div>
      );
    }
  });

  const overdueDates = items
    .filter((item) => item.data.completed === false)
    // eslint-disable-next-line array-callback-return
    .map((el, i) => {
      const momentDate = moment(el.data.dueDate).locale('en').utc().local();
      if (momentDate.isBefore(todayDate)) {
        const daysAgo = momentDate.from(todayDate, true);
        return (
          <div key={i} className="sidebar_item">
            <div onClick={() => navigate(`/${el.data.listId}`)} style={{ flex: '2' }}>
              <div className="sidebar_item-color" style={{ maxWidth: '150px' }}>
                <div style={{ backgroundColor: '#ff0000', minWidth: '12px' }}></div>
                <Tooltip title={el.data.title}>
                  <span className="sidebar_item-dots">{el.data.title}</span>
                </Tooltip>
              </div>
            </div>
            <p>{daysAgo} ago</p>
          </div>
        );
      }
    });

  return (
    <div className="calendar">
      <div className="calendar_header">
        <span style={{ color: theme === 'dark' ? '#fff' : '#000' }}>{currentDate.format('MMMM YYYY')}</span>
        <div className="calendar_header-btn">
          <button onClick={previousWeek}>
            <ArrowBackIosNewIcon fontSize="medium" style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
          </button>
          <button onClick={nextWeek}>
            <ArrowForwardIosIcon fontSize="medium" style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
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
          <p style={{ color: theme === 'dark' ? '#fff' : '#000', paddingTop: '20px' }}>
            {currentDate.format('D MMMM')}
          </p>

          {selectedDayItems}

          <div className={`sidebar_item-add sidebar_item-add_${theme}`} onClick={() => setOpen(true)}>
            <button className="list_button-calendar">
              <img src={addList} alt="list" />
              <span>New task</span>
            </button>
          </div>
        </>
      </div>
      <Divider color="#E1E6EF" />

      {todayDate.isSame(selectedDay, 'day') && (
        <div className="due">
          <div>
            <p>Due tomorrow</p>
            {items
              .filter((item) => item.data.completed === false)
              // eslint-disable-next-line array-callback-return
              .map((el, i) => {
                const momentDate = moment(el.data.dueDate).locale('en').utc().local();
                if (momentDate.isSame(tomorrowDate, 'day')) {
                  return (
                    <div key={i} className="sidebar_item">
                      <div onClick={() => navigate(`/${el.data.listId}`)} style={{ flex: '2' }}>
                        <div className="sidebar_item-color">
                          <div style={{ backgroundColor: el.data.listColor }}></div>
                          <Tooltip title={el.data.title}>
                            <span className="sidebar_item-dots">{el.data.title}</span>
                          </Tooltip>
                        </div>
                      </div>
                      <OptionsMenu
                        itemsCollection={itemsCollection}
                        isEditable={true}
                        index={el.data.id}
                        todos={todos}
                        todoCollection={todosCollection}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      )}
      {todayDate.isSame(selectedDay, 'day') && <Divider color="#E1E6EF" />}

      <div className="overdue">
        <div className="overdue_dot">
          <div className="overdue_dot-col"></div>
          <span>Overdue</span>
        </div>
        {overdueDates}
      </div>

      <ItemModal
        collection={itemsCollection}
        todos={todos}
        open={open}
        setOpen={setOpen}
        fromCalendar={true}
        currentDate={currentDate}
        todosList={todosList}
      />
    </div>
  );
};

export default Calendar;
