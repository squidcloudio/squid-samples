import { useCollection, useQuery } from '@squidcloud/react';
import './App.css';
import DisplayOrders from './components/display-orders';
import { Order } from './common/types';
import AddOrder from './components/add-order';

function App() {
  const ordersCollection = useCollection<Order>('ORDERS','snowflake-shop');
  const { data } = useQuery(ordersCollection.query().eq('O_CUSTKEY',121361).dereference());

  return (
    <div>
      <h1>Orders</h1>
      {data && <DisplayOrders orders={data} />}
      <AddOrder />
    </div>
  );
}

export default App;
