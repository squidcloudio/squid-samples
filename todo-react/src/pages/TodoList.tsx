import { List } from '@mui/material';

import addList from '../images/Component 1.png';

import { useCallback, useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@squidcloud/react';

import ItemModal from '../modals/ItemModal';
import StyledListItem from '../styled/StyledListItem';
import moment from 'moment';
import { useAuth0 } from '@auth0/auth0-react';
import { ThemeContext } from '../context';

const TodoList = ({ itemsCollection, todos }: any) => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [currentDate] = useState(moment());
  const momentString = currentDate.format('M/D/YYYY'); // convert to string with desired format

  const tomorrow = moment().add(1, 'day').startOf('day').format('M/D/YYYY'); // create a Moment object for tomorrow's date

  const [open, setOpen] = useState<boolean>(false);

  const { theme } = useContext(ThemeContext);

  const allItems = useQuery(
    itemsCollection.query().where('userId', '==', `${user?.sub}`).where('listId', '==', `${id}`),
    true,
  );
  const todaysItems = useQuery(
    itemsCollection.query().where('userId', '==', `${user?.sub}`).where('dueDate', '==', `${momentString}`),
    true,
  );
  const tomorrowItems = useQuery(
    itemsCollection.query().where('userId', '==', `${user?.sub}`).where('dueDate', '==', `${tomorrow}`),
    true,
  );
  const someday = useQuery(
    itemsCollection
      .query()
      .where('userId', '==', `${user?.sub}`)
      .where('dueDate', '!=', `${momentString}`)
      .where('dueDate', '!=', `${tomorrow}`),
    true,
  );

  const handleSetOpen = useCallback((value: any) => {
    setOpen(value);
  }, []);

  const changeStatusToCompleted = useCallback(
    (itemId: string) => {
      itemsCollection.doc(itemId).update({ completed: true });
    },
    [itemsCollection],
  );

  const listContent = useMemo(() => {
    if (id === 'today') {
      return todaysItems;
    } else if (id === 'tomorrow') {
      return tomorrowItems;
    } else if (id === 'someday') {
      return someday;
    } else {
      return allItems;
    }
  }, [allItems, id, todaysItems, tomorrowItems, someday]);

  return (
    <div className={`todo todo-${theme}`}>
      <List>
        {listContent
          ?.filter((item) => item.data.completed === false)
          .map((item: any, i: any) => (
            <StyledListItem
              isChecked={false}
              key={item.data.id}
              todos={todos}
              item={item}
              index={item.data.id}
              onClick={() => changeStatusToCompleted(item.data.id)}
            />
          ))}

        {!(id === 'today' || id === 'tomorrow' || id === 'someday') && (
          <button className="item_button" onClick={handleSetOpen}>
            <img src={addList} alt="list" />
            <span>New item</span>
          </button>
        )}

        <ItemModal collection={itemsCollection} todos={todos} open={open} setOpen={setOpen} items={allItems} />
      </List>
    </div>
  );
};

export default TodoList;
