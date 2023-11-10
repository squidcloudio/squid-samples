import { UserPayment } from '../common/user-payment';
interface UserPaymentProps {
  userPayment: UserPayment | undefined;
}

const DisplayInvoices: React.FC<UserPaymentProps> = ({ userPayment }) => {
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
