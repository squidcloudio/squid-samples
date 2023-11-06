import { UserPayment } from '../common/user-payment';

interface UserPaymentProps {
  userPayment: UserPayment;
}

const DisplayInvoices: React.FC<UserPaymentProps> = ({ userPayment }) => {
  const invoices = userPayment.invoices;
  const invoiceKeys = Object.keys(invoices);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Payment status</th>
          </tr>
        </thead>
        <tbody>
          {invoiceKeys.map((key) => (
            <tr key={key}>
              <td className="invoice-id">{key}</td>
              <td className="ispaid">{invoices[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayInvoices;
