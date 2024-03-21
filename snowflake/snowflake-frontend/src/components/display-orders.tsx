import { Order } from '../common/types';

interface OrderProps {
  orders: Order[];
}

const DisplayOrders: React.FC<OrderProps> = ({ orders }) => {
    console.log({orders})
  return (
    <div className="scrolling">
      <table>
        <thead>
          <tr>
            <th>Order date</th>
            <th>Order price</th>
            <th>Order status</th>
            <th>Order priority</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((entry, index) => (
            <tr key={index}>
              <td>{entry.O_ORDERDATE.toLocaleDateString()}</td>
              <td>{entry.O_TOTALPRICE}</td>
              <td>{entry.O_ORDERSTATUS}</td> 
              <td>{entry.O_ORDERPRIORITY}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayOrders;
