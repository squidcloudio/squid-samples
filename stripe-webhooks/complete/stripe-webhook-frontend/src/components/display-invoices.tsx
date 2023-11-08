import { UserPayment } from '../common/user-payment';
import { useCollection, useDoc } from '@squidcloud/react';
interface UserIdProps {
  userId: string;
}

const DisplayInvoices: React.FC<UserIdProps> = ({ userId }) => {
  const userPaymentsCollection = useCollection<UserPayment>('userPayments');

  const { data: userPayment } = useDoc(
    userPaymentsCollection.doc(userId),
    true,
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Payment status</th>
          </tr>
        </thead>
        {userPayment && (
          <tbody>
            {Object.keys(userPayment.invoices).map((key) => (
              <tr key={key}>
                <td className="invoice-id">{key}</td>
                <td className="ispaid">{userPayment.invoices[key]}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default DisplayInvoices;
