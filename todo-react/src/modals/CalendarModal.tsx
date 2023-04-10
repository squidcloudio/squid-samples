import { useAuth0 } from '@auth0/auth0-react';
import { Modal } from '@mui/material';
import { useCollection, useQuery } from '@squidcloud/react';

import DateInfo from '../components/DateInfo';
import { Todo } from '../interfaces/types';

const CalendarModal = ({ open, setOpen }: any) => {
  const { user } = useAuth0();

  const collection = useCollection<Todo>('todos');
  const todosList = useQuery(collection.query().where('userId', '==', `${user?.sub}`), true);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="calendar_modal">
        <DateInfo todosList={todosList} />
      </div>
    </Modal>
  );
};

export default CalendarModal;
