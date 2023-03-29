import { Outlet, useParams } from 'react-router-dom';
import { useCollection, useQuery } from '@squidcloud/react';
import vector from '../images/Vector.png';
import td from '../images/T•D•.png';
import themeChange from '../images/Vector-2.png';

export type Todo = {
  id?: string;
  title?: string;
  color: string;
  userId: string;
};

const Root = ({ avatar }: any) => {
  const { id } = useParams();
  const collection = useCollection<Todo>('todos');

  const [todos] = useQuery(collection.query().where('id', '==', `${id}`), true);

  return (
    <>
      <header style={{ backgroundColor: todos ? todos.data.color : '#14BE6E' }} className="header">
        <div>
          <img src={vector} alt="" />
          <img src={td} alt="" />
        </div>
        <div>
          <img src={themeChange} alt="theme" />
          <img src={avatar} alt="avatar" className="header_avatar" />
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Root;
