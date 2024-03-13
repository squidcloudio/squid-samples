import React from 'react';
import { useCollection } from '@squidcloud/react';
import { Order } from '../common/types';

const orderPriority: string[] = ['1-URGENT', '2-HIGH', '3-MEDIUM', '4-NOT SPECIFIED', '5-LOW'];

const AddOrder: React.FC = () => {
  const ordersCollection = useCollection<Order>('ORDERS', 'snowflake-shop');

  const getRandomPrice = (): number => {
    const randomNumber = Math.random() * 1000000;
    return Math.round(randomNumber * 100) / 100;
  };

  const getRandomDateInRange = (startDate: Date, endDate: Date): Date => {
    const start = startDate.getTime();
    const end = endDate.getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime);
  };

  const getRandomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomPriority = (): string => {
    const randomNumber = getRandomInteger(0, 4);
    return orderPriority[randomNumber];
  };

  const getRandomOrderStatus = (): string => {
    const randomNum = Math.round(Math.random());
    return randomNum === 1 ? 'O' : 'F';
  };

  const addRandomOrder = async () => {
    const startDate = new Date('1992-01-01');
    const endDate = new Date('1998-12-31');
    const O_ORDERKEY = getRandomInteger(1200000, 1299999);
    const O_CUSTKEY = 121361;
    const O_ORDERSTATUS = getRandomOrderStatus();
    const O_TOTALPRICE = getRandomPrice();
    const O_ORDERDATE = getRandomDateInRange(startDate, endDate);
    const O_ORDERPRIORITY = getRandomPriority();
    const O_CLERK = "Clerk#000000" + getRandomInteger(0, 999).toString().padStart(3, '0');
    const O_SHIPPRIORITY = 0;
    const O_COMMENT = "New randomly generated order";
    const newRandomOrder = {
      O_ORDERKEY, O_CUSTKEY, O_ORDERSTATUS, O_TOTALPRICE, O_ORDERDATE, O_ORDERPRIORITY, O_CLERK, O_SHIPPRIORITY, O_COMMENT
    };
    await ordersCollection.doc({ O_ORDERKEY }).insert(newRandomOrder);
  };

  return (
    <button onClick={addRandomOrder}>Add new order</button>
  );
}

export default AddOrder;
